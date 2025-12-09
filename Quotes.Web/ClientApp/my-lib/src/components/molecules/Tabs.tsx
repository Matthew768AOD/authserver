import React, { useState, type ReactNode } from 'react';
import styled from 'styled-components';

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode; // Může obsahovat text, obrázky, tlačítka, cokoli
  disabled?: boolean;
};

export type TabsProps = {
  tabs: TabItem[];
  defaultActiveTab?: string;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
  onChange?: (activeTabId: string) => void;
  className?: string;
};

type StyledProps = {
  $variant: 'default' | 'outlined' | 'filled';
  $size: 'small' | 'medium' | 'large';
};

const Container = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'outlined':
        return `
          border: 3px solid ${theme.colors.primary};
          box-shadow: ${theme.shadows.lg};
        `;
      case 'filled':
        return `
          background: ${theme.colors.background};
          box-shadow: ${theme.shadows.lg};
        `;
      default:
        return `
          border: 2px solid ${theme.colors.primary};
          box-shadow: ${theme.shadows.md};
        `;
    }
  }}
`;

const TabList = styled.div<StyledProps>`
  display: flex;
  background: ${({ theme, $variant }) => 
    $variant === 'filled' ? theme.colors.surface : theme.colors.background};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing.small};
  gap: ${({ theme }) => theme.spacing.small};
  
  /* Skryj scrollbar ale zachovej funkčnost */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button<StyledProps & { $active: boolean; $disabled: boolean }>`
  flex: 0 0 auto;
  min-width: fit-content;
  padding: ${({ $size }) => {
    switch ($size) {
      case 'small': return '12px 20px';
      case 'medium': return '16px 24px';
      case 'large': return '20px 28px';
      default: return '16px 24px';
    }
  }};
  
  background: ${({ $active, theme, $variant }) => {
    if ($active) {
      return theme.colors.primary;
    }
    return 'transparent';
  }};
  
  color: ${({ $active, theme, $disabled }) => {
    if ($disabled) return theme.colors.textDisabled;
    if ($active) return theme.colors.buttonText;
    return theme.colors.text;
  }};
  
  border: 2px solid ${({ $active, theme }) => 
    $active ? theme.colors.primary : 'transparent'};
  border-radius: 12px;
  
  font-size: ${({ $size }) => {
    switch ($size) {
      case 'small': return '0.875rem';
      case 'medium': return '1rem';
      case 'large': return '1.125rem';
      default: return '1rem';
    }
  }};
  
  font-weight: ${({ $active }) => $active ? '600' : '500'};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    background: ${({ theme, $active }) => {
      if ($active) return theme.colors.primary;
      return theme.colors.hover;
    }};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}40;
  }
  
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
`;

const TabContent = styled.div<StyledProps>`
  padding: ${({ $size }) => {
    switch ($size) {
      case 'small': return '20px 24px';
      case 'medium': return '24px 28px';
      case 'large': return '28px 32px';
      default: return '24px 28px';
    }
  }};
  
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  min-height: 120px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  
  /* Styling pro obsah */
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.spacing.small};
    color: ${({ theme }) => theme.colors.text};
  }
  
  p {
    margin: 0;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  button {
    margin: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.small} 0;
  }
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  font-style: italic;
`;

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveTab,
  variant = 'default',
  size = 'medium',
  onChange,
  className,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultActiveTab || tabs[0]?.id || ''
  );

  const handleTabClick = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab?.disabled) return;
    
    setActiveTabId(tabId);
    onChange?.(tabId);
  };

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  if (!tabs.length) {
    return (
      <Container $variant={variant} $size={size} className={className}>
        <EmptyState>Žádné taby nejsou k dispozici</EmptyState>
      </Container>
    );
  }

  return (
    <Container $variant={variant} $size={size} className={className}>
      <TabList $variant={variant} $size={size}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            $variant={variant}
            $size={size}
            $active={activeTabId === tab.id}
            $disabled={tab.disabled || false}
            onClick={() => handleTabClick(tab.id)}
            disabled={tab.disabled}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabList>
      
      <TabContent $variant={variant} $size={size}>
        {activeTab ? (
          activeTab.content
        ) : (
          <EmptyState>Obsah pro tento tab není k dispozici</EmptyState>
        )}
      </TabContent>
    </Container>
  );
};

export default Tabs;