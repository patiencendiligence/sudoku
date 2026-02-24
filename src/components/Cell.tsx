import React from 'react';
import { isValidMove, type SudokuGrid } from '../utils/sudoku';
import { themes } from '../hooks/useTheme';

interface CellProps {
  value: number | null;
  isOriginal: boolean;
  isSelected: boolean;
  isInvalid: boolean;
  row: number;
  col: number;
  onClick: () => void;
  colors: typeof themes.light;
  cellSize: number;
  fontSize: number;
}

export const Cell: React.FC<CellProps> = ({
  value,
  isOriginal,
  isSelected,
  isInvalid,
  row,
  col,
  onClick,
  colors,
  cellSize,
  fontSize,
}) => {
  const borderRight = col === 2 || col === 5 ? `2px solid ${colors.borderStrong}` : `1px solid ${colors.border}`;
  const borderBottom = row === 2 || row === 5 ? `2px solid ${colors.borderStrong}` : `1px solid ${colors.border}`;

  const getBgColor = () => {
    if (isSelected) return colors.cellSelected;
    if (isInvalid) return colors.cellInvalid;
    return colors.cellBg;
  };

  const getTextColor = () => {
    if (isOriginal) return colors.cellTextOriginal;
    if (isInvalid) return colors.cellTextInvalid;
    return colors.cellTextUser;
  };

  return (
    <div
      onClick={onClick}
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${fontSize}px`,
        fontWeight: isOriginal ? 'bold' : 'normal',
        backgroundColor: getBgColor(),
        color: getTextColor(),
        borderRight,
        borderBottom,
        cursor: isOriginal ? 'default' : 'pointer',
        userSelect: 'none',
        transition: 'background-color 0.15s, color 0.15s',
      }}
    >
      {value || ''}
    </div>
  );
};

interface BoardProps {
  puzzle: SudokuGrid;
  progress: SudokuGrid;
  selectedCell: [number, number] | null;
  onCellClick: (row: number, col: number) => void;
  colors: typeof themes.light;
  s: (px: number) => number;
}

export const Board: React.FC<BoardProps> = ({
  puzzle,
  progress,
  selectedCell,
  onCellClick,
  colors,
  s,
}) => {
  const cellSize = s(36);
  const fontSize = s(18);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(9, ${cellSize}px)`,
        gridTemplateRows: `repeat(9, ${cellSize}px)`,
        border: `2px solid ${colors.borderStrong}`,
        borderRadius: `${s(4)}px`,
        overflow: 'hidden',
      }}
    >
      {progress.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isOriginal = puzzle[rowIndex][colIndex] !== null;
          const isSelected = 
            selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
          const isInvalid = 
            cell !== null && 
            !isOriginal && 
            !isValidMove(progress, rowIndex, colIndex, cell);

          return (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              isOriginal={isOriginal}
              isSelected={isSelected}
              isInvalid={isInvalid}
              row={rowIndex}
              col={colIndex}
              onClick={() => !isOriginal && onCellClick(rowIndex, colIndex)}
              colors={colors}
              cellSize={cellSize}
              fontSize={fontSize}
            />
          );
        })
      )}
    </div>
  );
};
