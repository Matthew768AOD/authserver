import React, { useRef, useState } from "react";
import styled from "styled-components";

type Props = {
  size?: number;
  radius?: number;
  initialSrc?: string;
  onChange?: (file: File, dataUrl: string) => void;
  className?: string;
};

const Frame = styled.button<{ $size: number; $radius: number; $src?: string }>`
  position: relative;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: ${props => props.$radius}px;
  overflow: hidden;
  border: 2px solid rgba(0,0,0,.35);
  background: ${props => props.$src ? `center / cover no-repeat url(${props.$src})` : "#e9e9ee"};
  cursor: pointer;
  outline: none;
  box-shadow:
    5px 5px 12px rgba(0,0,0,.25),
    -3px -3px 8px rgba(255,255,255,.15);

  &:focus-visible {
    box-shadow:
      0 0 0 3px rgba(120, 99, 255, .35),
      5px 5px 12px rgba(0,0,0,.25),
      -3px -3px 8px rgba(255,255,255,.15);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(255,255,255,0);
  color: #000;
  font-size: 20px;
  font-weight: 600;
  opacity: 0;
  transition: opacity 150ms ease, background 150ms ease;
  pointer-events: none; /* don't block clicks */

  ${Frame}:hover & {
    opacity: 1;
    background: rgba(255,255,255,0.85);
  }
`;

export const ImagePicker: React.FC<Props> = ({
  size = 330,
  radius = 24,
  initialSrc,
  onChange,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState<string | undefined>(initialSrc);

  const open = () => inputRef.current?.click();

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setSrc(dataUrl);
      onChange?.(file, dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.currentTarget.value = "";
  };

  return (
    <>
      <Frame
        type="button"
        onClick={open}
        $size={size}
        $radius={radius}
        $src={src}
        className={className}
        aria-label="Choose image"
        title="Click to change!"
      >
        <Overlay>Click to change!</Overlay>
      </Frame>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onInputChange}
        style={{ display: "none" }}
      />
    </>
  );
};
