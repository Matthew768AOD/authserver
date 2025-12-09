import React from "react";
import * as LucideIcons from "lucide-react";
import styled from "styled-components";

export type IconProps = {
  name: keyof typeof LucideIcons;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

const StyledIconWrapper = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color, theme }) => $color || theme.colors.text};
`;

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color, 
  strokeWidth = 2 
}) => {
  const LucideIcon = LucideIcons[name] as React.ComponentType<LucideIcons.LucideProps>;
  
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  return (
    <StyledIconWrapper $color={color}>
      <LucideIcon size={size} strokeWidth={strokeWidth} />
    </StyledIconWrapper>
  );
};