import { useState, useEffect, useCallback, createContext, useContext } from 'react';

export type Language = 'ko' | 'en';

const translations = {
  ko: {
    bestRecord: '최고기록',
    level: '레벨',
    completed: '완료',
    games: '게임',
    pause: '일시정지',
    resume: '재개',
    reset: '초기화',
    newGame: '새 게임',
    startGame: '게임 시작',
    challengeLevel: (level: number) => `레벨 ${level} 스도쿠에 도전하세요!`,
    resetConfirm: '닉네임과 레벨이 초기화됩니다.\n최고기록은 유지됩니다.\n\n초기화하시겠습니까?',
    resetTooltip: '닉네임/레벨 초기화',
    levelTooltip: (level: number) => `레벨 ${level}`,
    congratulations: '축하합니다!',
    levelClear: (level: number) => `레벨 ${level} 클리어!`,
    newRecord: '🎊 새로운 최고기록! 🎊',
    nextRankUnlock: '다음 레벨에서 새 계급 획득!',
    maxLevelReached: '최고 레벨 달성!',
    levelUpLocked: (gamesNeeded: number) => `🔒 레벨업까지 ${gamesNeeded}게임 더 클리어하세요`,
    levelUp: '레벨 업! ↑',
    playAgain: '다시 플레이',
    continue: '계속하기',
    seconds: '초',
    language: '언어',
    languageTooltip: '언어 변경',
  },
  en: {
    bestRecord: 'Best',
    level: 'Level',
    completed: 'Completed',
    games: 'games',
    pause: 'Pause',
    resume: 'Resume',
    reset: 'Reset',
    newGame: 'New Game',
    startGame: 'Start Game',
    challengeLevel: (level: number) => `Challenge Level ${level} Sudoku!`,
    resetConfirm: 'Nickname and level will be reset.\nBest records will be kept.\n\nProceed?',
    resetTooltip: 'Reset nickname/level',
    levelTooltip: (level: number) => `Level ${level}`,
    congratulations: 'Congratulations!',
    levelClear: (level: number) => `Level ${level} Clear!`,
    newRecord: '🎊 New Record! 🎊',
    nextRankUnlock: 'New rank at next level!',
    maxLevelReached: 'Max Level!',
    levelUpLocked: (gamesNeeded: number) => `🔒 Clear ${gamesNeeded} more game(s) to level up`,
    levelUp: 'Level Up! ↑',
    playAgain: 'Play Again',
    continue: 'Continue',
    seconds: 's',
    language: 'Language',
    languageTooltip: 'Change language',
  },
} as const;

export type Translations = typeof translations.ko;

const STORAGE_KEY = 'sudoku-language';

function detectDefaultLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'ko' || stored === 'en') {
    return stored;
  }
  
  const browserLang = navigator.language || (navigator as any).userLanguage || '';
  if (browserLang.toLowerCase().startsWith('ko')) {
    return 'ko';
  }
  return 'en';
}

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(detectDefaultLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'ko' ? 'en' : 'ko'));
  }, []);

  const t = translations[language];

  return { language, setLanguage, toggleLanguage, t };
}

export { translations };
