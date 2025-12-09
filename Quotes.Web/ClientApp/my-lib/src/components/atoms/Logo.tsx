import React from 'react';
import styled from 'styled-components';
import { Icon } from './Icon';
import { Typography } from './Typography';

export type LogoProps = {
  iconSize?: number;
  iconColor?: string;
  text?: string;
};

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Logo: React.FC<LogoProps> = ({ 
  iconSize = 32, 
  iconColor,
  text = 'Company'
}) => {
  return (
    <LogoContainer>
      <Icon name="Circle" size={iconSize} color={iconColor} />
      <Typography variant="textLarge">{text}</Typography>
    </LogoContainer>
  );
};

