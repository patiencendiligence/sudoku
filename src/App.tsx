import React, { useEffect } from 'react';
import { useGame } from './hooks/useGame';
import { useTheme, themes } from './hooks/useTheme';
import { useScale } from './hooks/useScale';
import { Header } from './components/Header';
import { Board } from './components/Cell';
import { NumberPad } from './components/NumberPad';
import { CongratsModal } from './components/CongratsModal';
import { ThemeToggle } from './components/ThemeToggle';

const App: React.FC = () => {
  const {
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
    timer,
  } = useGame();

  const { theme, toggleTheme } = useTheme();
  const colors = themes[theme];
  const { s } = useScale();

  useEffect(() => {
    document.body.style.backgroundColor = colors.background;
    document.documentElement.style.backgroundColor = colors.background;
  }, [colors.background]);

  const hasGame = gameData.currentPuzzle && gameData.currentProgress;
  const bestTime = gameData.bestTimes[gameData.level] || null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell || !hasGame || isComplete) return;
      
      const num = parseInt(e.key);
      if (num >= 1 && num <= 9) {
        handleCellInput(selectedCell[0], selectedCell[1], num);
      } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        handleCellInput(selectedCell[0], selectedCell[1], null);
      } else if (e.key === 'Escape') {
        setSelectedCell(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, hasGame, isComplete, handleCellInput, setSelectedCell]);

  const handleNumberClick = (num: number | null) => {
    if (!selectedCell) return;
    handleCellInput(selectedCell[0], selectedCell[1], num);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '380px',
        minHeight: '100vh',
        margin: '0 auto',
        padding: `${s(16)}px`,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: colors.background,
        color: colors.text,
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: `${s(12)}px`,
          right: `${s(12)}px`,
          display: 'flex',
          gap: `${s(8)}px`,
        }}
      >
        <button
          onClick={() => {
            if (window.confirm('닉네임과 레벨이 초기화됩니다.\n최고기록은 유지됩니다.\n\n초기화하시겠습니까?')) {
              resetAll();
            }
          }}
          style={{
            width: `${s(36)}px`,
            height: `${s(36)}px`,
            borderRadius: '50%',
            border: 'none',
            backgroundColor: theme === 'light' ? '#f0f0f0' : '#2a2a4a',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${s(16)}px`,
            transition: 'all 0.3s',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
          title="닉네임/레벨 초기화"
        >
          🔄
        </button>
        <ThemeToggle theme={theme} onToggle={toggleTheme} s={s} />
      </div>
      
      <Header
        nickname={gameData.nickname}
        level={gameData.level}
        gamesCompleted={gameData.gamesCompleted}
        colors={colors}
        s={s}
        bestTime={bestTime}
        elapsedTime={timer.elapsedTime}
        isTimerRunning={timer.isRunning}
        onTimerToggle={timer.toggle}
        hasActiveGame={!!hasGame && !isComplete}
      />

      {hasGame ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Board
              puzzle={gameData.currentPuzzle!}
              progress={gameData.currentProgress!}
              selectedCell={selectedCell}
              onCellClick={(row, col) => setSelectedCell([row, col])}
              colors={colors}
              s={s}
            />
          </div>

          <NumberPad
            onNumberClick={handleNumberClick}
            disabled={!selectedCell || isComplete || !timer.isRunning}
            colors={colors}
            s={s}
          />

          <div
            style={{
              marginTop: `${s(16)}px`,
              display: 'flex',
              gap: `${s(8)}px`,
              justifyContent: 'center',
            }}
          >
            <button
              onClick={resetGame}
              style={{
                padding: `${s(8)}px ${s(16)}px`,
                fontSize: `${s(13)}px`,
                backgroundColor: colors.buttonBg,
                color: colors.text,
                border: `1px solid ${colors.buttonBorder}`,
                borderRadius: `${s(6)}px`,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              초기화
            </button>
            <button
              onClick={startNewGame}
              style={{
                padding: `${s(8)}px ${s(16)}px`,
                fontSize: `${s(13)}px`,
                backgroundColor: colors.buttonBg,
                color: colors.text,
                border: `1px solid ${colors.buttonBorder}`,
                borderRadius: `${s(6)}px`,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              새 게임
            </button>
          </div>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: `${s(300)}px`,
            gap: `${s(16)}px`,
          }}
        >
          <div style={{ fontSize: `${s(48)}px` }}>🧩</div>
          <p style={{ color: colors.textSecondary, margin: 0, fontSize: `${s(14)}px` }}>
            레벨 {gameData.level} 스도쿠에 도전하세요!
          </p>
          {bestTime && (
            <p style={{ color: colors.textSecondary, margin: 0, fontSize: `${s(12)}px` }}>
              🏆 최고기록: {Math.floor(bestTime / 1000)}초
            </p>
          )}
          <button
            onClick={startNewGame}
            style={{
              padding: `${s(12)}px ${s(32)}px`,
              fontSize: `${s(16)}px`,
              fontWeight: 'bold',
              backgroundColor: colors.primary,
              color: 'white',
              border: 'none',
              borderRadius: `${s(8)}px`,
              cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primaryHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary;
            }}
          >
            게임 시작
          </button>
        </div>
      )}

      {showCongrats && (
        <CongratsModal
          level={gameData.level}
          onLevelUp={levelUp}
          onContinue={continueAtSameLevel}
          onClose={() => {}}
          colors={colors}
          s={s}
          isNewRecord={isNewRecord}
          completionTime={completionTime}
          levelCompletions={gameData.levelCompletions[gameData.level] || 0}
        />
      )}
    </div>
  );
};

export default App;
