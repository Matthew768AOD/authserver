import React from 'react';
import styled from 'styled-components';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';

export type SocialLink = {
  name: 'Linkedin' | 'Facebook' | 'Twitter';
  href: string;
  ariaLabel: string;
};

export type FooterSocialProps = {
  title: string;
  socialLinks: SocialLink[];
};

const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

const SocialTitle = styled(Typography)`
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const SocialIcons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

export const FooterSocial: React.FC<FooterSocialProps> = ({ title, socialLinks }) => {
  return (
    <SocialContainer>
      <SocialTitle variant="textLarge">{title}</SocialTitle>
      <SocialIcons>
        {socialLinks.map((social, index) => (
          <SocialIcon key={index} href={social.href} aria-label={social.ariaLabel}>
            <Icon name={social.name} size={20} color="white" />
          </SocialIcon>
        ))}
      </SocialIcons>
    </SocialContainer>
  );
};

export default FooterSocial;
