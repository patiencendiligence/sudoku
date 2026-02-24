# Quick Notes (Sudoku Game)

회사에서 몰래 즐길 수 있는 스도쿠 게임 브라우저 확장프로그램입니다.
확장프로그램 이름은 "Quick Notes"로 위장되어 있습니다.

## 기능

- 레벨 1~10 난이도 시스템 (레벨이 올라갈수록 어려워짐)
- 사용자 닉네임 자동 생성 (지역에 따라 한글/영문)
  - 한국어 환경: "빨간고양이", "파란토끼" 등
  - 영어 환경: "RedCat", "BlueFox" 등
- 레벨별 계급 이모티콘
  - 🐹 레벨 1: 햄스터
  - 🐕 레벨 3: 강아지
  - 🦜 레벨 5: 앵무새
  - 🐬 레벨 7: 돌고래
  - ⭐ 레벨 9: 별
  - 👑 레벨 10: 왕관 (최고 레벨!)
- 로컬스토리지에 진행상황 자동 저장

## 설치 방법

### 개발 모드

```bash
cd sudoku-extension
npm install
npm run dev
```

브라우저에서 http://localhost:5173 접속

### 확장프로그램 설치

1. 빌드하기
```bash
npm run build
```

2. Chrome에서 `chrome://extensions` 접속
3. "개발자 모드" 활성화
4. "압축해제된 확장 프로그램을 로드합니다" 클릭
5. `dist` 폴더 선택

## 아이콘 추가

`public/icons/` 폴더에 다음 파일들을 추가하세요:
- icon16.png (16x16)
- icon48.png (48x48)
- icon128.png (128x128)

## 플레이 방법

1. 확장프로그램 아이콘 클릭
2. "게임 시작" 버튼 클릭
3. 빈 칸을 클릭하고 1-9 숫자 입력
4. 키보드 또는 숫자 패드 사용 가능
5. 완료하면 레벨업 가능!

## 기술 스택

- React 18
- TypeScript
- Vite
- Chrome Extension Manifest V3
