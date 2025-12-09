import styled, { useTheme } from "styled-components";
import React from "react";

type Props = React.PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
  maxWidth?: number | string;
}>;

const Frame = styled.div<{ $border: string; $ring: string; }>`
  position: relative;
  border-radius: 16px;
  border: 5px solid ${props => props.$border};
  /*
  background: rgba(255,255,255,0.07);
  backdrop-filter: blur(6px) saturate(1);
  */
  padding: 32px;
`;

export const GlassContainer: React.FC<Props> = ({
  children,
  className,
  style,
  maxWidth = 880,
}) => {
  const theme: any = useTheme();
  const isDark = theme.mode === "dark";
  const border = isDark ? theme.colors.magnolia : theme.colors.grey;
  const ring = theme.colors.periwinkle;

  return (
    <Frame
      className={className}
      style={{ maxWidth, margin: "32px auto", ...style }}
      $border={border}
      $ring={ring}
    >
      {children}
    </Frame>
  );
};
