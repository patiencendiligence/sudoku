import React from 'react';
import type { Theme } from '../hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  s: (px: number) => number;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle, s }) => {
  return (
    <button
      onClick={onToggle}
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
        fontSize: `${s(18)}px`,
        transition: 'all 0.3s',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      }}
      title={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
