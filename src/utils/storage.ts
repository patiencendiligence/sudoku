import { generateNickname } from './nickname';
import type { SudokuGrid } from './sudoku';

const STORAGE_KEY = 'sudoku_game_data';

export interface GameData {
  nickname: string;
  level: number;
  currentPuzzle: SudokuGrid | null;
  currentSolution: SudokuGrid | null;
  currentProgress: SudokuGrid | null;
  gamesCompleted: number;
  bestTimes: Record<number, number>;
  levelCompletions: Record<number, number>;
  currentElapsedTime: number;
}

const defaultGameData: GameData = {
  nickname: '',
  level: 1,
  currentPuzzle: null,
  currentSolution: null,
  currentProgress: null,
  gamesCompleted: 0,
  bestTimes: {},
  levelCompletions: {},
  currentElapsedTime: 0,
};

export function loadGameData(): GameData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored) as GameData;
      return { ...defaultGameData, ...data };
    }
  } catch (e) {
    console.error('Failed to load game data:', e);
  }
  
  return {
    ...defaultGameData,
    nickname: generateNickname(),
  };
}

export function saveGameData(data: Partial<GameData>): void {
  try {
    const current = loadGameData();
    const updated = { ...current, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save game data:', e);
  }
}

export function resetProgress(): void {
  saveGameData({
    currentPuzzle: null,
    currentSolution: null,
    currentProgress: null,
    currentElapsedTime: 0,
  });
}

export function saveBestTime(level: number, time: number): boolean {
  const current = loadGameData();
  const currentBest = current.bestTimes[level];
  
  if (!currentBest || time < currentBest) {
    const newBestTimes = { ...current.bestTimes, [level]: time };
    saveGameData({ bestTimes: newBestTimes });
    return true;
  }
  return false;
}

export function getBestTime(level: number): number | null {
  const data = loadGameData();
  return data.bestTimes[level] || null;
}

export function resetAllProgress(): GameData {
  const current = loadGameData();
  const newNickname = generateNickname();
  
  const resetData: GameData = {
    ...defaultGameData,
    nickname: newNickname,
    bestTimes: current.bestTimes,
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resetData));
  return resetData;
}
