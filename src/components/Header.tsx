import React from 'react';
import { getDisplayName, getRankEmoji } from '../utils/nickname';
import { themes } from '../hooks/useTheme';
import { formatTime, formatBestTime } from '../hooks/useTimer';

interface HeaderProps {
  nickname: string;
  level: number;
  gamesCompleted: number;
  colors: typeof themes.light;
  s: (px: number) => number;
  bestTime: number | null;
  elapsedTime: number;
  isTimerRunning: boolean;
  onTimerToggle: () => void;
  hasActiveGame: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  nickname,
  level,
  gamesCompleted,
  colors,
  s,
  bestTime,
  elapsedTime,
  isTimerRunning,
  onTimerToggle,
  hasActiveGame,
}) => {
  const displayName = getDisplayName(nickname, level);
  
  return (
    <div
      style={{
        marginBottom: `${s(16)}px`,
        padding: `${s(12)}px`,
        backgroundColor: colors.surface,
        borderRadius: `${s(8)}px`,
        textAlign: 'center',
        transition: 'background-color 0.3s',
      }}
    >
      {bestTime && (
        <div
          style={{
            fontSize: `${s(11)}px`,
            color: colors.textSecondary,
            marginBottom: `${s(4)}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: `${s(4)}px`,
          }}
        >
          <span>🏆</span>
          <span>최고기록: {formatBestTime(bestTime)}</span>
        </div>
      )}
      
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: `${s(8)}px`,
          marginBottom: `${s(4)}px`,
        }}
      >
        <div
          style={{
            fontSize: `${s(16)}px`,
            fontWeight: 'bold',
            color: colors.text,
          }}
        >
          {displayName}
        </div>
        
        {hasActiveGame && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: `${s(4)}px`,
            }}
          >
            <span
              style={{
                fontSize: `${s(13)}px`,
                fontFamily: 'monospace',
                color: isTimerRunning ? colors.primary : colors.textSecondary,
                minWidth: `${s(50)}px`,
              }}
            >
              {formatTime(elapsedTime)}
            </span>
            <button
              onClick={onTimerToggle}
              style={{
                width: `${s(24)}px`,
                height: `${s(24)}px`,
                borderRadius: '50%',
                border: `1px solid ${colors.buttonBorder}`,
                backgroundColor: colors.buttonBg,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: `${s(10)}px`,
                padding: 0,
              }}
              title={isTimerRunning ? '일시정지' : '재개'}
            >
              {isTimerRunning ? '⏸' : '▶'}
            </button>
          </div>
        )}
      </div>
      
      <div
        style={{
          fontSize: `${s(13)}px`,
          color: colors.textSecondary,
        }}
      >
        레벨 {level} / 10 • 완료 {gamesCompleted}게임
      </div>
      <div
        style={{
          marginTop: `${s(8)}px`,
          display: 'flex',
          justifyContent: 'center',
          gap: `${s(4)}px`,
        }}
      >
        {[1, 3, 5, 7, 9, 10].map((l) => (
          <span
            key={l}
            style={{
              fontSize: `${s(14)}px`,
              opacity: level >= l ? 1 : 0.3,
              filter: level >= l ? 'none' : 'grayscale(100%)',
            }}
            title={`레벨 ${l}`}
          >
            {getRankEmoji(l)}
          </span>
        ))}
      </div>
    </div>
  );
};
