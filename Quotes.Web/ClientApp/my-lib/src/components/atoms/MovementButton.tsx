import React from "react";
import styled, { useTheme } from "styled-components";

export type MovementButtonProps = {
  direction?: "forward" | "back";
  onClick?: () => void;
};

const ButtonWithRing = styled.button<{ $border: string; $ring: string }>`
  position: relative;
  z-index: 1;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 4px solid ${props => props.$border};
  cursor: pointer;

  outline: none;

  &:focus,
  &:focus-visible {
    outline: none;
  }

  &:hover {
    border-color: ${props => props.$ring};
    svg {
      stroke: ${props => props.$ring};
    }
  }
`;
const Chevron = ({ direction, color }: { direction: "forward" | "back"; color: string }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke={color}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {direction === "forward" ? (
      <path d="M8 4l8 8-8 8" />
    ) : (
      <path d="M16 4L8 12l8 8" />
    )}
  </svg>
  </div>
);

export const MovementButton: React.FC<MovementButtonProps> = ({ direction = "forward", onClick, }) => {
  const theme: any = useTheme();
  const ringColor = theme.colors.periwinkle;

  return (
    <ButtonWithRing
      $border={theme.colors.primary}
      $ring={ringColor}
      title={direction}
      onClick={onClick ?? (() =>
      direction === "forward" ? window.history.forward() : window.history.back()
      )}
    >
      <Chevron direction={direction} color={theme.colors.primary} />
    </ButtonWithRing>
  );
};
