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
const XIcon = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke={color}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 6l12 12M6 18L18 6" />
  </svg>
);

export const CloseButton = ({ onClick, }: { onClick?: () => void; }) => {
  const theme: any = useTheme();
  const ringColor = theme.colors.periwinkle;

  return (
    <ButtonWithRing
      $border={theme.colors.primary}
      $ring={ringColor}
      title="Close"
      onClick={onClick ?? (() => console.log("Close button clicked"))}
    >
      <XIcon color={theme.colors.primary} />
    </ButtonWithRing>
  );
};
