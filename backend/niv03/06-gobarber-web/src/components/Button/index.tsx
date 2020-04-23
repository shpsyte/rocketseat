import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
const Button: React.FC<ButtonProps> = ({ children, type, ...rest }) => (
  <Container {...rest} type={type}>
    {children}
  </Container>
);

export default Button;
