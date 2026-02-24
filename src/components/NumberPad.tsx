import React from 'react';
import { themes } from '../hooks/useTheme';

interface NumberPadProps {
  onNumberClick: (num: number | null) => void;
  disabled: boolean;
  colors: typeof themes.light;
  s: (px: number) => number;
}

export const NumberPad: React.FC<NumberPadProps> = ({ onNumberClick, disabled, colors, s }) => {
  const buttonSize = s(40);
  const fontSize = s(18);
  const gap = s(6);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: `${gap}px`,
        marginTop: `${s(16)}px`,
        opacity: disabled ? 0.5 : 1,
        maxWidth: `${s(230)}px`,
        margin: `${s(16)}px auto 0`,
      }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => onNumberClick(num)}
          disabled={disabled}
          style={{
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            fontSize: `${fontSize}px`,
            fontWeight: 'bold',
            border: `1px solid ${colors.buttonBorder}`,
            borderRadius: `${s(6)}px`,
            backgroundColor: colors.buttonBg,
            color: colors.text,
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = colors.buttonHover;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.buttonBg;
          }}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => onNumberClick(null)}
        disabled={disabled}
        style={{
          width: `${buttonSize}px`,
          height: `${buttonSize}px`,
          fontSize: `${s(14)}px`,
          border: `1px solid ${colors.cellTextInvalid}`,
          borderRadius: `${s(6)}px`,
          backgroundColor: colors.cellInvalid,
          color: colors.cellTextInvalid,
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.15s',
        }}
      >
        ✕
      </button>
    </div>
  );
};
