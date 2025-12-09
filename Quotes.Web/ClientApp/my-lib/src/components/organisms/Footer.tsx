import React from 'react';
import styled from 'styled-components';
import { FooterCompany } from '../molecules/FooterCompany';
import { FooterSection } from '../molecules/FooterSection';
import { FooterSocial } from '../molecules/FooterSocial';
import { FooterBottom } from '../molecules/FooterBottom';
import type { FooterLink } from '../molecules/FooterSection';
import type { SocialLink } from '../molecules/FooterSocial';
import type { FooterBottomLink } from '../molecules/FooterBottom';

export type FooterProps = {
  className?: string;
  companyName?: string;
  companyDescription?: string;
  copyrightText?: string;
  sections?: Array<{
    title: string;
    links: FooterLink[];
  }>;
  socialTitle?: string;
  socialLinks?: SocialLink[];
  bottomLinks?: FooterBottomLink[];
  bottomText?: string;
};

const FooterContainer = styled.footer`
  background-color: #202020;
  color: white;
  padding: ${({ theme }) => theme.spacing.large};
  position: relative;
  border-top: 2px solid white;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 80%, rgba(220, 204, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(160, 138, 245, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.large};
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.medium};
  }
`;

const defaultSections = [
  {
    title: 'Společnost',
    links: [
      { label: '- O nás', href: '#about' },
      { label: '- Kariéra', href: '#career' },
      { label: '- Blog', href: '#blog' },
      { label: '- Novinky', href: '#news' },
    ],
  },
  {
    title: 'Produkty',
    links: [
      { label: '- Modely', href: '#models' },
      { label: '- Konfigurátor', href: '#configurator' },
      { label: '- Ceník', href: '#pricing' },
      { label: '- Testovací jízda', href: '#test-drive' },
    ],
  },
];

const defaultSocialLinks: SocialLink[] = [
  { name: 'Linkedin', href: '#linkedin', ariaLabel: 'LinkedIn' },
  { name: 'Facebook', href: '#facebook', ariaLabel: 'Facebook' },
  { name: 'Twitter', href: '#twitter', ariaLabel: 'Twitter' },
];

const defaultBottomLinks: FooterBottomLink[] = [
  { label: 'Podmínky použití', href: '#terms' },
  { label: 'GDPR', href: '#privacy' },
  { label: 'Cookies', href: '#cookies' },
];

export const Footer: React.FC<FooterProps> = ({ 
  className,
  companyName = 'Luxusní Automobily',
  companyDescription = 'Vytváříme nejluxusnější sportovní automobily s nejvyšší kvalitou a výkonem. Každý vůz je mistrovským dílem inženýrství a designu.',
  copyrightText = '© 2025 Luxusní Automobily s.r.o. Všechna práva vyhrazena.',
  sections = defaultSections,
  socialTitle = 'Sledujte nás',
  socialLinks = defaultSocialLinks,
  bottomLinks = defaultBottomLinks,
  bottomText = 'Vytvořeno pro milovníky luxusu a zbytečně drahých aut'
}) => {
  return (
    <FooterContainer className={className}>
      <FooterContent>
        <FooterCompany 
          companyName={companyName}
          description={companyDescription}
          copyrightText={copyrightText}
        />
        
        {sections.map((section, index) => (
          <FooterSection 
            key={index}
            title={section.title}
            links={section.links}
          />
        ))}
        
        <FooterSocial 
          title={socialTitle}
          socialLinks={socialLinks}
        />
      </FooterContent>

      <FooterBottom 
        links={bottomLinks}
        bottomText={bottomText}
      />
    </FooterContainer>
  );
};

export default Footer;