import { useState, useEffect, useCallback } from 'react';
import { generateSudoku, checkSolution, type SudokuGrid } from '../utils/sudoku';
import { loadGameData, saveGameData, saveBestTime, resetAllProgress, type GameData } from '../utils/storage';
import { generateNickname } from '../utils/nickname';
import { useTimer } from './useTimer';

export function useGame() {
  const [gameData, setGameData] = useState<GameData>(() => loadGameData());
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [completionTime, setCompletionTime] = useState(0);
  
  const timer = useTimer();

  useEffect(() => {
    if (!gameData.nickname) {
      const nickname = generateNickname();
      const updated = { ...gameData, nickname };
      setGameData(updated);
      saveGameData(updated);
    }
  }, [gameData]);


  const startNewGame = useCallback(() => {
    const { puzzle, solution } = generateSudoku(gameData.level);
    const progress = puzzle.map(row => [...row]);
    
    const updated: GameData = {
      ...gameData,
      currentPuzzle: puzzle,
      currentSolution: solution,
      currentProgress: progress,
      currentElapsedTime: 0,
    };
    
    setGameData(updated);
    saveGameData(updated);
    setIsComplete(false);
    setShowCongrats(false);
    setIsNewRecord(false);
    setSelectedCell(null);
    timer.start();
  }, [gameData, timer]);

  const handleCellInput = useCallback((row: number, col: number, value: number | null) => {
    if (!gameData.currentPuzzle || !gameData.currentProgress || !gameData.currentSolution) return;
    if (gameData.currentPuzzle[row][col] !== null) return;

    const newProgress = gameData.currentProgress.map(r => [...r]);
    newProgress[row][col] = value;

    const updated = { ...gameData, currentProgress: newProgress };
    setGameData(updated);
    saveGameData(updated);

    if (checkSolution(newProgress, gameData.currentSolution)) {
      const finalTime = timer.stop();
      setCompletionTime(finalTime);
      setIsComplete(true);
      
      const newRecord = saveBestTime(gameData.level, finalTime);
      setIsNewRecord(newRecord);
      
      const currentLevelCompletions = gameData.levelCompletions[gameData.level] || 0;
      const newLevelCompletions = {
        ...gameData.levelCompletions,
        [gameData.level]: currentLevelCompletions + 1,
      };
      saveGameData({ levelCompletions: newLevelCompletions });
      
      const refreshedData = loadGameData();
      setGameData(refreshedData);
      
      setShowCongrats(true);
    }
  }, [gameData, timer]);

  const levelUp = useCallback(() => {
    if (gameData.level < 10) {
      const newLevel = gameData.level + 1;
      const updated: GameData = {
        ...gameData,
        level: newLevel,
        gamesCompleted: gameData.gamesCompleted + 1,
        currentPuzzle: null,
        currentSolution: null,
        currentProgress: null,
        currentElapsedTime: 0,
      };
      setGameData(updated);
      saveGameData(updated);
      setShowCongrats(false);
      setIsNewRecord(false);
      timer.reset();
    }
  }, [gameData, timer]);

  const continueAtSameLevel = useCallback(() => {
    const updated: GameData = {
      ...gameData,
      gamesCompleted: gameData.gamesCompleted + 1,
      currentPuzzle: null,
      currentSolution: null,
      currentProgress: null,
      currentElapsedTime: 0,
    };
    setGameData(updated);
    saveGameData(updated);
    setShowCongrats(false);
    setIsNewRecord(false);
    timer.reset();
  }, [gameData, timer]);

  const resetGame = useCallback(() => {
    if (!gameData.currentPuzzle) return;
    const progress = gameData.currentPuzzle.map(row => [...row]);
    const updated = { ...gameData, currentProgress: progress, currentElapsedTime: 0 };
    setGameData(updated);
    saveGameData(updated);
    setIsComplete(false);
    timer.start();
  }, [gameData, timer]);

  const toggleTimer = useCallback(() => {
    if (timer.isRunning) {
      timer.pause();
    } else {
      timer.resume();
    }
  }, [timer]);

  const resetAll = useCallback(() => {
    const resetData = resetAllProgress();
    setGameData(resetData);
    setSelectedCell(null);
    setIsComplete(false);
    setShowCongrats(false);
    setIsNewRecord(false);
    setCompletionTime(0);
    timer.reset();
  }, [timer]);

  return {
    gameData,
    selectedCell,
    setSelectedCell,
    isComplete,
    showCongrats,
    isNewRecord,
    completionTime,
    startNewGame,
    handleCellInput,
    levelUp,
    continueAtSameLevel,
    resetGame,
    resetAll,
    timer: {
      elapsedTime: timer.elapsedTime,
      isRunning: timer.isRunning,
      toggle: toggleTimer,
    },
  };
}
