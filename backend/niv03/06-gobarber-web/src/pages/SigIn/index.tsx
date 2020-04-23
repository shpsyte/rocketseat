import React from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SigIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="" />
      <Form onSubmit={() => {}}>
        <h1>Fala seu logon</h1>
        <Input icon={FiMail} name="email" type="text" placeholder="E-mail" />

        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />

        <Button type="submit">Entrar</Button>

        <a href="forgot">Esqueci minha senha</a>
      </Form>
      <a href="login">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SigIn;
