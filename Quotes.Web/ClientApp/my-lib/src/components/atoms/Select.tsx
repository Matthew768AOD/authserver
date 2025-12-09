import styled from 'styled-components';

const StyledSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.typography.textSmall.fontSize};
  font-family: ${({ theme }) => theme.fonts.main};
  border: 1px solid ${({ theme }) => theme.colors.textDisabled};
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export type SelectOption = { id: string; name: string; price: number };

type Props = {
  value: string;
  onChange: (val: string) => void;
  options: SelectOption[];
};

export const Select = ({ value, onChange, options }: Props) => {
  return (
    <StyledSelect value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select a product</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </StyledSelect>
  );
};
