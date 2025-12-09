import React from 'react';
import styled from 'styled-components';
import { Typography } from '../atoms/Typography';

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterSectionProps = {
  title: string;
  links: FooterLink[];
};

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

const SectionTitle = styled(Typography)`
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

export const FooterSection: React.FC<FooterSectionProps> = ({ title, links }) => {
  return (
    <SectionContainer>
      <SectionTitle variant="textLarge">{title}</SectionTitle>
      <LinkList>
        {links.map((link, index) => (
          <FooterLink key={index} href={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </LinkList>
    </SectionContainer>
  );
};

export default FooterSection;
