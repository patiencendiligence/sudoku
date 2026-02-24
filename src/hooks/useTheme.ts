import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'sudoku_theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}

export const themes = {
  light: {
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#333333',
    textSecondary: '#666666',
    border: '#cccccc',
    borderStrong: '#333333',
    cellBg: '#ffffff',
    cellSelected: '#e3f2fd',
    cellInvalid: '#ffebee',
    cellTextOriginal: '#333333',
    cellTextUser: '#1976d2',
    cellTextInvalid: '#d32f2f',
    buttonBg: '#f5f5f5',
    buttonBorder: '#dddddd',
    buttonHover: '#e0e0e0',
    primary: '#1976d2',
    primaryHover: '#1565c0',
    success: '#4caf50',
    warning: '#fff3e0',
    accent: '#fce4ec',
  },
  dark: {
    background: '#1a1a2e',
    surface: '#16213e',
    text: '#eaeaea',
    textSecondary: '#a0a0a0',
    border: '#3a3a5c',
    borderStrong: '#6a6a8c',
    cellBg: '#0f0f23',
    cellSelected: '#2d4a6f',
    cellInvalid: '#4a1a1a',
    cellTextOriginal: '#ffffff',
    cellTextUser: '#64b5f6',
    cellTextInvalid: '#ef5350',
    buttonBg: '#2a2a4a',
    buttonBorder: '#3a3a5c',
    buttonHover: '#3a3a6a',
    primary: '#42a5f5',
    primaryHover: '#64b5f6',
    success: '#66bb6a',
    warning: '#3d3020',
    accent: '#3d2030',
  },
};
