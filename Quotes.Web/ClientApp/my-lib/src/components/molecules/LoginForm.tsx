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

const CheckboxWrapper = styled.div`  
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const LoginForm: React.FC = () => {

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
        Login
      </Typography>

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
        <Checkbox title="Remember me" />
      </CheckboxWrapper>

      <Button size="medium" variant="primary">
        Login
      </Button>
    </FormWrapper>
  );
};

