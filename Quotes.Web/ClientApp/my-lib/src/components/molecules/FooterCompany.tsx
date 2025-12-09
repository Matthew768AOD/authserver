import React from 'react';
import styled from 'styled-components';
import { Typography } from '../atoms/Typography';
import { Logo } from '../atoms/Logo';

export type FooterCompanyProps = {
  companyName: string;
  description: string;
  copyrightText: string;
};

const CompanyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const CompanyDescription = styled(Typography)`
  opacity: 0.8;
  line-height: 1.6;
`;

const Copyright = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing.medium};
  opacity: 0.7;
`;

export const FooterCompany: React.FC<FooterCompanyProps> = ({ 
  companyName, 
  description, 
  copyrightText 
}) => {
  return (
    <CompanyContainer>
      <Logo iconSize={32} iconColor="white" text={companyName} />
      <CompanyDescription variant="textSmall">
        {description}
      </CompanyDescription>
      <Copyright variant="extraSmall">
        {copyrightText}
      </Copyright>
    </CompanyContainer>
  );
};

export default FooterCompany;
