const koreanColors = [
  '빨간', '파란', '노란', '초록', '보라', '분홍', '하얀', '검은', 
  '주황', '하늘', '연두', '금색', '은색', '청록', '자주'
];

const koreanAnimals = [
  '고양이', '강아지', '토끼', '여우', '곰', '사자', '호랑이', '펭귄',
  '코알라', '판다', '기린', '코끼리', '햄스터', '다람쥐', '올빼미',
  '독수리', '돌고래', '고래', '물개', '수달'
];

const englishColors = [
  'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Pink', 'White', 'Black',
  'Orange', 'Sky', 'Lime', 'Golden', 'Silver', 'Teal', 'Magenta'
];

const englishAnimals = [
  'Cat', 'Dog', 'Rabbit', 'Fox', 'Bear', 'Lion', 'Tiger', 'Penguin',
  'Koala', 'Panda', 'Giraffe', 'Elephant', 'Hamster', 'Squirrel', 'Owl',
  'Eagle', 'Dolphin', 'Whale', 'Seal', 'Otter'
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function isKoreanLocale(): boolean {
  const lang = navigator.language || 'en';
  return lang.startsWith('ko');
}

export function generateNickname(): string {
  if (isKoreanLocale()) {
    const color = getRandomItem(koreanColors);
    const animal = getRandomItem(koreanAnimals);
    return `${color}${animal}`;
  } else {
    const color = getRandomItem(englishColors);
    const animal = getRandomItem(englishAnimals);
    return `${color}${animal}`;
  }
}

export function getRankEmoji(level: number): string {
  if (level >= 10) return '👑';
  if (level >= 9) return '⭐';
  if (level >= 7) return '🐬';
  if (level >= 5) return '🦜';
  if (level >= 3) return '🐕';
  return '🐹';
}

export function getDisplayName(nickname: string, level: number): string {
  const emoji = getRankEmoji(level);
  return `${emoji} ${nickname}`;
}
