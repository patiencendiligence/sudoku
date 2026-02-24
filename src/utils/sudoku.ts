export type SudokuGrid = (number | null)[][];

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isValid(grid: SudokuGrid, row: number, col: number, num: number): boolean {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }

  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
}

function solveSudoku(grid: SudokuGrid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of numbers) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) return true;
            grid[row][col] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generateCompleteSudoku(): SudokuGrid {
  const grid: SudokuGrid = Array(9).fill(null).map(() => Array(9).fill(null));
  solveSudoku(grid);
  return grid;
}

function getCellsToRemove(level: number): number {
  const baseCells = 30;
  const additionalCells = Math.min(level - 1, 9) * 3;
  return Math.min(baseCells + additionalCells, 58);
}

export function generateSudoku(level: number): { puzzle: SudokuGrid; solution: SudokuGrid } {
  const solution = generateCompleteSudoku();
  const puzzle: SudokuGrid = solution.map(row => [...row]);
  
  const cellsToRemove = getCellsToRemove(level);
  const positions = shuffle(
    Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9])
  );

  for (let i = 0; i < cellsToRemove && i < positions.length; i++) {
    const [row, col] = positions[i];
    puzzle[row][col] = null;
  }

  return { puzzle, solution };
}

export function checkSolution(current: SudokuGrid, solution: SudokuGrid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (current[row][col] !== solution[row][col]) return false;
    }
  }
  return true;
}

export function isValidMove(grid: SudokuGrid, row: number, col: number, num: number): boolean {
  const tempGrid: SudokuGrid = grid.map(r => [...r]);
  tempGrid[row][col] = null;
  return isValid(tempGrid, row, col, num);
}
