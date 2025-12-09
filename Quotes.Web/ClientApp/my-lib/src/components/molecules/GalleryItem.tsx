import React from 'react';
import styled from 'styled-components';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';

export type GalleryItemProps = {
  src: string;
  alt: string;
  onView?: () => void;
  onExternalLink?: () => void;
};

const ItemContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  ${ItemContainer}:hover & {
    transform: translateY(0);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const GalleryItem: React.FC<GalleryItemProps> = ({ 
  src, 
  alt, 
  onView,
  onExternalLink
}) => {
  return (
    <ItemContainer>
      <Image src={src} alt={alt} />
      <Overlay>
        <ButtonGroup>
          <Button 
            size="small" 
            variant="primary"
            onClick={onView}
          >
            View
          </Button>
          <Button 
            size="small" 
            variant="secondary"
            onClick={onExternalLink}
          >
            <Icon name="ExternalLink" size={16} />
          </Button>
        </ButtonGroup>
      </Overlay>
    </ItemContainer>
  );
};

