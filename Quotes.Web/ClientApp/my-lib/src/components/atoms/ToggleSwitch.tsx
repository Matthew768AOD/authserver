import React, { useState, useId } from "react";
import styled, { useTheme } from "styled-components";
import { defaultTheme } from "../../styles/theme";

type ToggleProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
};

const Track = styled.button<{ $border: string; $ring: string; $checked: boolean }>`
  position: relative;
  width: 80px;
  height: 40px;
  border-radius: 9999px;
  background: transparent;

  border: 4px solid ${props => props.$border};

  display: inline-flex;
  align-items: center;
  cursor: pointer;
  outline: none;

  &:disabled { cursor: not-allowed; opacity: .7; }
  &:hover { border-color: ${props => props.$ring}; }
`;

const Knob = styled.span<{ $checked: boolean; $border: string; $ring: string }>`
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translate(${({ $checked }) => ($checked ? "40px" : "0")}, -50%);
  width: 31px;
  height: 31px;
  border-radius: 50%;
  background: ${({theme}) => theme.colors.primary};
  color: ${({theme}) => theme.colors.primary};
  transition:
    transform 220ms cubic-bezier(.2,.8,.2,1),
    background-color 150ms ease;


  ${Track}:hover & {
    background: ${props => props.$ring};
  }
`;

export const ToggleSwitch: React.FC<ToggleProps> = ({
  checked,
  defaultChecked = false,
  onChange,
  disabled,
  className,
  id,
}) => {
  const theme: any = useTheme();
  const isDark = theme.mode === "dark";

  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked! : internal;

  const borderColor = isDark ? theme.colors.magnolia : theme.colors.grey;
  const ringColor = theme.colors.red;

  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const htmlId = id ?? useId();

  return (
    <Track
      id={htmlId}
      role="switch"
      aria-checked={on}
      aria-disabled={disabled}
      $border={borderColor}
      $ring={ringColor}
      $checked={on}
      disabled={disabled}
      className={className}
      onClick={toggle}
      title={on ? "On" : "Off"}
    >
      <Knob $checked={on} $border={borderColor} $ring={ringColor} />
    </Track>
  );
};
