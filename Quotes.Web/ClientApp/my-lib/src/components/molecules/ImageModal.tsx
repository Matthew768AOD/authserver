import React from 'react';
import styled from 'styled-components';
import { IconButton } from '../atoms/IconButton';

export type ImageModalProps = {
  isOpen: boolean;
  imageSrc?: string;
  onClose: () => void;
};

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: white;
  border-radius: 50%;
  
  button {
    padding: 0.75rem;
  }
`;

export const ImageModal: React.FC<ImageModalProps> = ({ 
  isOpen, 
  imageSrc, 
  onClose 
}) => {
  return (
    <ModalOverlay $isOpen={isOpen} onClick={onClose}>
      {imageSrc && (
        <>
          <ModalImage src={imageSrc} alt="Full size" />
          <CloseButtonWrapper>
            <IconButton 
              iconName="X" 
              size={24} 
              color="#000000"
              onClick={onClose}
            />
          </CloseButtonWrapper>
        </>
      )}
    </ModalOverlay>
  );
};

