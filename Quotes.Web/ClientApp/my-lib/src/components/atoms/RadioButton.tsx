import React, { type InputHTMLAttributes } from "react";
import styled from "styled-components";

export type RadioButtonProps = {
  variant?: "primary" | "secondary";
  size?: "small" | "large";
  checked?: boolean;
  name?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>;

// OPRAVA: Udělej typy povinné - budeme zajišťovat hodnoty v komponentě
type StyledProps = {
  $variant: "primary" | "secondary";
  $size: "small" | "large"; // Odstraň ?
  $checked: boolean; // Odstraň ?
};

const HiddenRadio = styled.input.attrs({ type: "radio" })`
  display: none;
`;

const StyledRadio = styled.span<StyledProps>`
  display: inline-block;
  border-radius: 50%;
  border: 4px solid ${({ theme, $variant }) => $variant === "primary" ? theme.colors.text : theme.colors.secondary};
  width: ${({ $size }) => ($size === "small" ? "20px" : "30px")}; // ZJEDNODUŠ
  height: ${({ $size }) => ($size === "small" ? "20px" : "30px")}; // ZJEDNODUŠ
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${({ $size }) => ($size === "small" ? "10px" : "18px")}; // ZJEDNODUŠ
    height: ${({ $size }) => ($size === "small" ? "10px" : "18px")}; // ZJEDNODUŠ
    
    background: radial-gradient(
      circle at 30% 30%,
      rgba(80, 80, 80, 0.7) 0%,
      ${({ theme, $variant }) => $variant === "primary" ? theme.colors.primary : theme.colors.secondary} 60%,
      ${({ theme, $variant }) => $variant === "primary" ? theme.colors.primary : theme.colors.secondary} 100%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(${({ $checked }) => ($checked ? 1 : 0)});
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
`;

export const RadioButton: React.FC<RadioButtonProps> = ({
  variant = "primary",
  size = "small",
  checked = false,
  ...props
}) => {
  const safeVariant: "primary" | "secondary" = variant === "primary" || variant === "secondary" ? variant : "primary";
  const safeSize: "small" | "large" = size === "small" || size === "large" ? size : "small";
  const safeChecked: boolean = !!checked;

  return (
    <label>
      <HiddenRadio checked={safeChecked} {...props} />
      <StyledRadio 
        $variant={safeVariant}
        $size={safeSize}
        $checked={safeChecked}
      />
    </label>
  );
};