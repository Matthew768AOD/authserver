import React from 'react';
import styled from 'styled-components';
import { Typography } from '../atoms/Typography';

export type FooterBottomLink = {
  label: string;
  href: string;
};

export type FooterBottomProps = {
  links: FooterBottomLink[];
  bottomText: string;
};

const BottomContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.large};
  padding-top: ${({ theme }) => theme.spacing.medium};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
  position: relative;
  z-index: 1;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const BottomLink = styled.a`
  color: white;
  text-decoration: none;
  opacity: 0.7;
  font-size: 0.875rem;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const BottomText = styled(Typography)`
  opacity: 0.7;
`;

export const FooterBottom: React.FC<FooterBottomProps> = ({ links, bottomText }) => {
  return (
    <BottomContainer>
      <BottomLinks>
        {links.map((link, index) => (
          <BottomLink key={index} href={link.href}>
            {link.label}
          </BottomLink>
        ))}
      </BottomLinks>
      <BottomText variant="extraSmall">
        {bottomText}
      </BottomText>
    </BottomContainer>
  );
};

export default FooterBottom;
