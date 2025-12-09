import React, { useState } from 'react';
import styled from 'styled-components';
import { GalleryItem } from './GalleryItem';
import { ImageModal } from './ImageModal';

export type ImageGalleryProps = {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
  }>;
};

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
`;

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <GalleryContainer>
        {images.map((image, index) => (
          <GalleryItem 
            key={index}
            src={image.src}
            alt={image.alt}
            onView={() => setSelectedImage(image.src)}
            onExternalLink={() => window.open(image.src, '_blank')}
          />
        ))}
      </GalleryContainer>

      <ImageModal 
        isOpen={!!selectedImage}
        imageSrc={selectedImage || undefined}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
};

