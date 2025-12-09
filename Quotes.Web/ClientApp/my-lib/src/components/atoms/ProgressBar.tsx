import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';

export interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  min?: number;
  interactive?: boolean; // true = slider, false = pouze progress bar
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  label?: string;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

type StyledProps = {
  $size: 'small' | 'medium' | 'large';
  $variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  $interactive: boolean;
  $disabled: boolean;
};

const Container = styled.div<{ $disabled: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`;

const Label = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const Track = styled.div<StyledProps>`
  position: relative;
  background: ${({ theme }) => theme.colors.light};
  border-radius: ${({ $size }) => {
    switch ($size) {
      case 'small': return '2px';
      case 'medium': return '4px';
      case 'large': return '6px';
      default: return '4px';
    }
  }};
  height: ${({ $size }) => {
    switch ($size) {
      case 'small': return '4px';
      case 'medium': return '8px';
      case 'large': return '12px';
      default: return '8px';
    }
  }};
  width: 100%;
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  transition: all 0.2s ease;

  &:hover {
    ${({ $interactive, theme }) => $interactive && `
      box-shadow: 0 0 0 2px ${theme.colors.primary}20;
    `}
  }
`;

const Fill = styled.div<StyledProps & { $progress: number }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${({ $progress }) => Math.max(0, Math.min(100, $progress))}%;
  background: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return theme.colors.primary;
    }
  }};
  border-radius: inherit;
  transition: width 0.3s ease;
`;

const Thumb = styled.div<StyledProps & { $progress: number }>`
  position: absolute;
  z-index: 99;
  top: 50%;
  left: ${({ $progress }) => Math.max(0, Math.min(100, $progress))}%;
  transform: translate(-50%, -50%);
  width: ${({ $size }) => {
    switch ($size) {
      case 'small': return '12px';
      case 'medium': return '18px';
      case 'large': return '24px';
      default: return '18px';
    }
  }};
  height: ${({ $size }) => {
    switch ($size) {
      case 'small': return '12px';
      case 'medium': return '18px';
      case 'large': return '24px';
      default: return '18px';
    }
  }};
  background: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return theme.colors.primary;
    }
  }};
  border: 2px solid ${({ theme }) => theme.colors.surface};
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: ${({ $interactive }) => ($interactive ? 'grab' : 'default')};
  transition: all 0.2s ease;
  display: ${({ $interactive }) => ($interactive ? 'block' : 'none')};

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    cursor: grabbing;
    transform: translate(-50%, -50%) scale(0.95);
  }
`;

const ValueDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  min = 0,
  interactive = false,
  size = 'medium',
  variant = 'primary',
  showLabel = false,
  label,
  onChange,
  disabled = false,
  className,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Normalize value to 0-100 percentage
  const normalizedValue = ((value - min) / (max - min)) * 100;

  const calculateValueFromEvent = useCallback(
    (event: MouseEvent | React.MouseEvent): number => {
      if (!trackRef.current) return value;

      const rect = trackRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      return min + percentage * (max - min);
    },
    [min, max, value]
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (!interactive || disabled) return;

      event.preventDefault();
      setIsDragging(true);
      
      const newValue = calculateValueFromEvent(event);
      onChange?.(Math.round(newValue));
    },
    [interactive, disabled, calculateValueFromEvent, onChange]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging || !interactive || disabled) return;

      const newValue = calculateValueFromEvent(event);
      onChange?.(Math.round(newValue));
    },
    [isDragging, interactive, disabled, calculateValueFromEvent, onChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global mouse events for dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <Container $disabled={disabled} className={className}>
      {(showLabel || label) && (
        <Label>{label || `${interactive ? 'Slider' : 'Progress'}: ${Math.round(value)}${max === 100 ? '%' : ''}`}</Label>
      )}
      
      <Track
        ref={trackRef}
        $size={size}
        $variant={variant}
        $interactive={interactive}
        $disabled={disabled}
        onMouseDown={handleMouseDown}
      >
        <Fill
          $size={size}
          $variant={variant}
          $interactive={interactive}
          $disabled={disabled}
          $progress={normalizedValue}
        />
        
        <Thumb
          $size={size}
          $variant={variant}
          $interactive={interactive}
          $disabled={disabled}
          $progress={normalizedValue}
        />
      </Track>

      {interactive && (
        <ValueDisplay>
          <span>{min}</span>
          <span>{Math.round(value)}</span>
          <span>{max}</span>
        </ValueDisplay>
      )}
    </Container>
  );
};

export default ProgressBar;