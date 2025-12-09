import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Typography } from "../atoms/Typography";
import { InputField, WarningText } from "../atoms/InputField";
import { Checkbox } from "../atoms/Checkbox";
import { Button } from "../atoms/Button";

const FormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 40px;
  cursor: default;
  border-radius: 50px;
  border: 5px solid ${({ theme }) => theme.colors.primary};
  /*
  box-shadow: 6px 6px 10px ${({ theme }) => theme.colors.text || '#000'}; 
  box-shadow ${({ theme }) => theme.shadows.boxShadow  || "0 2px 8px rgba(0,0,0,0.12)"};
  */
  overflow: hidden;
  min-height: 50px;
  background: transparent;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  &::after {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 52px;
    /*
    border: 5px solid
      ${({ theme }) => theme.colors.inputBorder || '#A08AF5'};
    */
    pointer-events: none;
  }
`;

const Section = styled.div`  
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`  
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: space-between;
`;

const CheckboxWrapper = styled.div`  
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const WideInputWrapper = styled.div`
  flex: 1;
  max-width: 180px;
`;

export const RegistrationForm: React.FC = () => {

  const [showWarning, setShowWarning] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
  
    const handleEmailInput = () => {
      const value = emailRef.current?.querySelector("input")?.value || "";
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setShowWarning(value.length > 0 && !isValid);
    };

  return (
    <FormWrapper>
      <Typography as="h1" variant="h2">
        Registration
      </Typography>

      <Section>
        <Typography as="h2" variant="textLarge">
          Name
        </Typography>
        <Row>
          <InputField placeholder="First Name" type="text" />
          <InputField placeholder="Last Name" type="text" />
        </Row>
      </Section>

      <Section>
        <Typography as="h2" variant="textLarge">
          Date of birth
        </Typography>
        <Row>
          <WideInputWrapper>
            <InputField type="numberSelect" placeholder="Day" min={1} max={31} />
          </WideInputWrapper>
          <WideInputWrapper>
            <InputField type="numberSelect" placeholder="Month" min={1} max={12} />
          </WideInputWrapper>
          <WideInputWrapper>
            <InputField type="numberSelect" placeholder="Year" min={1900} max={2025} />
          </WideInputWrapper>
        </Row>
      </Section>

      <Section>
        <Typography as="h2" variant="textLarge">
          Email
        </Typography>
        <div ref={emailRef} onInput={handleEmailInput}>
          <InputField placeholder="example.here@email.com" type="text" />
        </div>
        {showWarning && (
          <WarningText>Invalid email format.</WarningText>
        )}
      </Section>

      <Section>
        <Typography as="h2" variant="textLarge">
          Password
        </Typography>
        <InputField type="password" placeholder="G4s#G3aT@s" />
      </Section>

      <CheckboxWrapper>
        <Checkbox title="I have read and agree to Terms of Service" />
      </CheckboxWrapper>

      <Button size="medium" variant="primary">
        Register
      </Button>
    </FormWrapper>
  );
};

