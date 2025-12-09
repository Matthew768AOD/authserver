import React, { type ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

type Fit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

export type ImageProps = {
  width?: string | number;
  height?: string | number;
  fit?: Fit;
} & ImgHTMLAttributes<HTMLImageElement>;

const ImageWrapper = styled.div<{ $width?: string | number; $height?: string | number }>`
  width: ${({ $width }) => (typeof $width === 'number' ? `${$width}px` : $width || '100%')};
  height: ${({ $height }) => (typeof $height === 'number' ? `${$height}px` : $height || 'auto')};
  border-radius: 10px;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  overflow: hidden; /* Klíčové pro oříznutí obrázku uvnitř */
  box-sizing: border-box;
`;

const StyledImage = styled.img<{ $fit?: Fit }>`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: ${({ $fit }) => $fit || 'cover'}; /* Výchozí hodnota je 'cover' */
`;

export const Image = ({
  width,
  height,
  fit = 'cover',
  ...props
}: ImageProps) => {
  return (
    <ImageWrapper $width={width} $height={height}>
      <StyledImage {...props} $fit={fit} />
    </ImageWrapper>
  );
};

export default Image;