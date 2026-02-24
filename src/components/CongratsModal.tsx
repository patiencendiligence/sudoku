import React from 'react';
import { getRankEmoji } from '../utils/nickname';
import { themes } from '../hooks/useTheme';
import { formatBestTime } from '../hooks/useTimer';

interface CongratsModalProps {
  level: number;
  onLevelUp: () => void;
  onContinue: () => void;
  onClose: () => void;
  colors: typeof themes.light;
  s: (px: number) => number;
  isNewRecord: boolean;
  completionTime: number;
  levelCompletions: number;
}

export const CongratsModal: React.FC<CongratsModalProps> = ({
  level,
  onLevelUp,
  onContinue,
  onClose,
  colors,
  s,
  isNewRecord,
  completionTime,
  levelCompletions,
}) => {
  const isMaxLevel = level >= 10;
  const nextLevelEmoji = !isMaxLevel ? getRankEmoji(level + 1) : null;
  const willUnlockNewRank = [2, 4, 6, 8, 9].includes(level);
  const canLevelUp = levelCompletions >= 3;
  const gamesNeeded = 3 - levelCompletions;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: `${s(16)}px`,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: colors.background,
          padding: `${s(24)}px`,
          borderRadius: `${s(12)}px`,
          textAlign: 'center',
          maxWidth: `${s(300)}px`,
          width: '100%',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          border: `1px solid ${colors.border}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: `${s(48)}px`, marginBottom: `${s(16)}px` }}>
          {isNewRecord ? '🏆' : '🎉'}
        </div>
        
        {isNewRecord && (
          <div
            style={{
              backgroundColor: '#ffd700',
              color: '#333',
              padding: `${s(8)}px ${s(16)}px`,
              borderRadius: `${s(20)}px`,
              fontSize: `${s(14)}px`,
              fontWeight: 'bold',
              marginBottom: `${s(12)}px`,
              display: 'inline-block',
            }}
          >
            🎊 새로운 최고기록! 🎊
          </div>
        )}
        
        <h2 style={{ margin: `0 0 ${s(8)}px`, color: colors.text, fontSize: `${s(20)}px` }}>
          축하합니다!
        </h2>
        
        <p style={{ margin: `0 0 ${s(8)}px`, color: colors.textSecondary, fontSize: `${s(14)}px` }}>
          레벨 {level} 클리어!
        </p>
        
        <p style={{ margin: `0 0 ${s(16)}px`, color: colors.primary, fontSize: `${s(16)}px`, fontWeight: 'bold' }}>
          ⏱️ {formatBestTime(completionTime)}
        </p>
        
        {willUnlockNewRank && !isMaxLevel && (
          <div
            style={{
              backgroundColor: colors.warning,
              padding: `${s(8)}px ${s(12)}px`,
              borderRadius: `${s(8)}px`,
              marginBottom: `${s(16)}px`,
              fontSize: `${s(13)}px`,
              color: colors.text,
            }}
          >
            다음 레벨에서 새 계급 획득! {nextLevelEmoji}
          </div>
        )}

        {isMaxLevel ? (
          <div
            style={{
              backgroundColor: colors.accent,
              padding: `${s(12)}px`,
              borderRadius: `${s(8)}px`,
              marginBottom: `${s(16)}px`,
            }}
          >
            <div style={{ fontSize: `${s(24)}px` }}>👑</div>
            <div style={{ fontSize: `${s(14)}px`, color: colors.text, fontWeight: 'bold' }}>
              최고 레벨 달성!
            </div>
          </div>
        ) : null}

        {!isMaxLevel && !canLevelUp && (
          <div
            style={{
              fontSize: `${s(12)}px`,
              color: colors.textSecondary,
              marginBottom: `${s(12)}px`,
            }}
          >
            🔒 레벨업까지 {gamesNeeded}게임 더 클리어하세요
          </div>
        )}

        <div style={{ display: 'flex', gap: `${s(8)}px`, justifyContent: 'center' }}>
          {!isMaxLevel && canLevelUp && (
            <button
              onClick={onLevelUp}
              style={{
                padding: `${s(10)}px ${s(20)}px`,
                fontSize: `${s(14)}px`,
                fontWeight: 'bold',
                backgroundColor: colors.success,
                color: 'white',
                border: 'none',
                borderRadius: `${s(6)}px`,
                cursor: 'pointer',
              }}
            >
              레벨 업! ↑
            </button>
          )}
          <button
            onClick={onContinue}
            style={{
              padding: `${s(10)}px ${s(20)}px`,
              fontSize: `${s(14)}px`,
              backgroundColor: colors.buttonBg,
              color: colors.text,
              border: `1px solid ${colors.buttonBorder}`,
              borderRadius: `${s(6)}px`,
              cursor: 'pointer',
            }}
          >
            {isMaxLevel ? '다시 플레이' : '계속하기'}
          </button>
        </div>
      </div>
    </div>
  );
};
