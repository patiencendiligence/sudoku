import React from 'react';
import { Language } from '../hooks/useLanguage';

interface LanguageToggleProps {
  language: Language;
  onToggle: () => void;
  s: (px: number) => number;
  theme: 'light' | 'dark';
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, onToggle, s, theme }) => {
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
        fontSize: `${s(12)}px`,
        fontWeight: 'bold',
        transition: 'all 0.3s',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        color: theme === 'light' ? '#333' : '#fff',
      }}
      title={language === 'ko' ? 'Change to English' : '한국어로 변경'}
    >
      {language === 'ko' ? '한' : 'EN'}
    </button>
  );
};
