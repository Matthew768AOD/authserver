// ...existing code...
import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { Typography } from "./Typography";
import { defaultTheme } from "../../styles/theme";

export type Option = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type DropdownProps = {
  options: Option[];
  value?: Option | Option[] | null;
  onChange?: (value: Option | Option[] | null) => void;
  multi?: boolean;
  placeholder?: string;
  disabled?: boolean;
  Icon?: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;
  className?: string;
};

const Caret: React.FC<{ className?: string }> = ({ className }) => (
  <span className={className} aria-hidden>
    ▾
  </span>
);

const DropdownWrap = styled.div`
  position: relative;
  display: inline-block;
  min-width: 200px;
  font-family: ${({ theme }) => theme.fonts.main};
`;

const Control = styled.button<{ disabled?: boolean }>`
  width: 100%;
  text-align: left;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow};
  transition: box-shadow 0.15s ease, background-color 0.15s ease;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.boxShadowHover};
  }
`;

const ValueArea = styled.div`
  display: inline-flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  background: rgba(255,255,255,0.12);
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 0.9em;
`;

const Menu = styled.ul`
  position: absolute;
  z-index: 50;
  margin: 8px 0 0 0;
  padding: 8px 4px;
  list-style: none;
  width: 100%;
  background: ${({ theme }) => theme.colors.background || "#fff"};
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  max-height: 240px;
  overflow: auto;
`;

const Item = styled.li<{ highlighted?: boolean; disabled?: boolean }>`
  padding: 8px 12px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background: ${({ highlighted, theme }) => (highlighted ? theme.colors.hover : "transparent")};
  color: ${({ disabled, theme }) => (disabled ? theme.colors.textDisabled : theme.colors.text)};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

/* Component */
export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value = null,
  onChange,
  multi = false,
  placeholder = "Vybrat…",
  disabled = false,
  Icon,
  className,
}) => {
  const IconComp = Icon ?? Caret;
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<number>(-1);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // normalize selected
  const selectedArray: Option[] = React.useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const toggleOpen = () => {
    if (disabled) return;
    setOpen((v) => !v);
  };

  const isSelected = (opt: Option) => selectedArray.some((s) => s.value === opt.value);

  const handleSelect = (opt: Option) => {
    if (opt.disabled) return;
    if (multi) {
      const exists = isSelected(opt);
      const newValue = exists
        ? selectedArray.filter((s) => s.value !== opt.value)
        : [...selectedArray, opt];
      onChange?.(newValue);
    } else {
      onChange?.(opt);
      setOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlight(0);
      } else if (highlight >= 0) {
        handleSelect(options[highlight]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <DropdownWrap ref={rootRef} className={className}>
      <Control
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        type="button"
      >
        <ValueArea>
          {selectedArray.length === 0 ? (
            <Typography variant="textSmall">
              {placeholder}
            </Typography>
          ) : multi ? (
            selectedArray.map((s) => (
              <Badge key={s.value}>
                <Typography variant="textSmall">{s.label}</Typography>
              </Badge>
            ))
          ) : (
            <Typography variant="textSmall">{selectedArray[0].label}</Typography>
          )}
        </ValueArea>
        <IconComp className="dropdown-caret" aria-hidden />
      </Control>

      {open && (
        <Menu role="listbox" aria-multiselectable={multi}>
          {options.map((opt, idx) => (
            <Item
              key={opt.value}
              role="option"
              aria-selected={isSelected(opt)}
              onClick={() => handleSelect(opt)}
              highlighted={idx === highlight}
              disabled={opt.disabled}
              onMouseEnter={() => setHighlight(idx)}
            >
              <Typography variant="textSmall">{opt.label}</Typography>
              {isSelected(opt) ? (
                <Typography variant="textSmall">✓</Typography>
              ) : null}
            </Item>
          ))}
        </Menu>
      )}
    </DropdownWrap>
  );
};
