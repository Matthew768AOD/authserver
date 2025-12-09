import React, { useState } from "react";
import styled from "styled-components";
import { Typography } from "./Typography";

export type InputFieldProps = {
  type?: "text" | "password" | "number" | "numberSelect" | "stringSelect";
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  value?: string | number;
  onChange?: (val: string | number) => void;
  readOnly?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const parseNumberOptions = (input: string): number[] => {
  const opts: number[] = [];
  input.split(",").forEach((part) => {
    part = part.trim();
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-").map((s) => s.trim());
      const start = Number(startStr);
      const end = Number(endStr);
      if (!isNaN(start) && !isNaN(end) && start <= end) {
        for (let i = start; i <= end; i++) opts.push(i);
      }
    } else {
      const num = Number(part);
      if (!isNaN(num)) opts.push(num);
    }
  });
  return opts;
};

const StyledFieldInput = styled.input`
  font-family: ${({ theme }) => theme.fonts.main};
  border: none;
  outline: none;
  width: 100%;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.textLarge.fontSize};
  font-weight: ${({ theme }) => theme.typography.textLarge.fontWeight};
  padding: 12px 20px;
`;

const InputFieldWrapper = styled.div`
  position: relative;
  cursor: text;
  display: flex;
  align-items: center;
  border-radius: 50px;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  overflow: hidden;
  min-height: 50px;
`;

const Popup = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  z-index: 10;
`;

const PopupItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #7e7e7e3d;
  }
`;

const Display = styled.div`
  padding: 12px 20px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const SelectTriangle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  width: 16px;
  height: 10px;
  cursor: pointer;

  &::before {
    content: "";
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 6px solid ${({ theme }) => theme.colors.text || "#000"};
  }

  &:hover::before {
    opacity: 0.6;
  }
`;

export const WarningText = styled.div`
  margin-top: 6px;
  margin-left: 12px;
  color: ${({ theme }) => theme.colors.error || "#E63946"};
  font-size: ${({ theme }) => theme.typography.extraSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.extraSmall.fontWeight};
`;

export const InputField = ({
  type = "text",
  placeholder,
  min,
  max,
  step = 1,
  options = [],
  value,
  onKeyDown,
  onChange,
}: InputFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [numberValue, setNumberValue] = useState<string>(value?.toString() || "");
  const [stringValue, setStringValue] = useState<string>(value?.toString() || "");
  const [password, setPassword] = useState<string>(value?.toString() || "");
  const [showWarnings, setShowWarnings] = useState(false);

  const numbers =
    type === "numberSelect"
      ? options && options.length > 0
        ? parseNumberOptions(options.join(","))
        : min !== undefined && max !== undefined
          ? Array.from({ length: max - min + 1 }, (_, i) => min + i)
          : []
      : [];

  const togglePopup = () => setIsOpen((prev) => !prev);

  const handleSelectNumber = (num: number) => {
    setNumberValue(num.toString());
    onChange?.(num);
    setIsOpen(false);
  };

  const handleSelectString = (str: string) => {
    setStringValue(str);
    onChange?.(str);
    setIsOpen(false);
  };

  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const showPasswordWarning = showWarnings && password.length > 0 && (!hasMinLength || !hasSpecialChar);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setNumberValue(input);
      onChange?.(input === "" ? "" : Number(input));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setShowWarnings(true);
    onChange?.(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStringValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div style={{ position: "relative" }}>
      {type === "numberSelect" ? (
        <>
          <InputFieldWrapper onClick={togglePopup} style={{ cursor: "pointer" }}>
            <Display>{numberValue || placeholder}</Display>
            <SelectTriangle />
          </InputFieldWrapper>
          {isOpen && (
            <Popup>
              {numbers.map((num) => (
                <PopupItem key={num} onClick={() => handleSelectNumber(num)}>
                  {num}
                </PopupItem>
              ))}
            </Popup>
          )}
        </>
      ) : type === "stringSelect" ? (
        <>
          <InputFieldWrapper onClick={togglePopup} style={{ cursor: "pointer" }}>
            <Display>{stringValue || placeholder}</Display>
            <SelectTriangle />
          </InputFieldWrapper>
          {isOpen && (
            <Popup>
              {options.map((opt) => (
                <PopupItem key={opt} onClick={() => handleSelectString(opt)}>
                  {opt}
                </PopupItem>
              ))}
            </Popup>
          )}
        </>
      ) : type === "number" ? (
        <InputFieldWrapper>
          <StyledFieldInput
            type="text"
            placeholder={placeholder}
            value={numberValue}
            onChange={handleNumberChange}
            min={min}
            max={max}
            step={step}
            onKeyDown={onKeyDown}
          />
        </InputFieldWrapper>
      ) : type === "password" ? (
        <>
          <InputFieldWrapper>
            <StyledFieldInput
              type="password"
              placeholder={placeholder}
              value={password}
              onChange={handlePasswordChange}
            />
          </InputFieldWrapper>
          {showPasswordWarning && (
            <div>
              {!hasMinLength && <WarningText>Password must be at least 8 characters.</WarningText>}
              {!hasSpecialChar && <WarningText>Password must include a special character.</WarningText>}
            </div>
          )}
        </>
      ) : (
        <InputFieldWrapper>
          <StyledFieldInput
            type="text"
            placeholder={placeholder}
            value={stringValue}
            onChange={handleTextChange}
            onKeyDown={onKeyDown}
          />
        </InputFieldWrapper>
      )}
    </div>
  );
};
