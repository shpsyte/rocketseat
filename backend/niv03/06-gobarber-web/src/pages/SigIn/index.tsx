import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationsErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SigInFormData {
  email: string;
  password: string;
}

const SigIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { sigIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SigInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email é obrigatorio')
            .email('Email invalido'),
          password: Yup.string().required('Senha obrigatorio'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await sigIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login.. ',
        });
      }
    },
    [sigIn, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
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
};

export default SigIn;
