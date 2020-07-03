import React, { useCallback, useRef, ChangeEvent } from 'react';

import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';
import { Container, Content, AvatarInput } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationsErrors';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}
const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('Email é obrigatorio')
            .email('Email invalido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('password é obrigatorio'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('password é obrigatorio'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Senhas não sao iguais'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);
        updateUser(response.data);

        history.push('/dashboard');
        addToast({
          title: 'Perfil atualizado com sucesso',
          type: 'success',
          description: 'Suas informações foram atualizadas com sucess',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no Perfil',
          description: 'Ocorreu um erro ao atualizar o perfil .. ',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then((res) => {
          updateUser(res.data);
          addToast({
            title: 'Avatar atualizado',
            type: 'success',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          onSubmit={handleSubmit}
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input icon={FiUser} name="name" type="text" placeholder="Nome" />
          <Input icon={FiMail} name="email" type="text" placeholder="E-mail" />
          <Input
            containterStyle={{ marginTop: 24 }}
            name="old_password"
            type="password"
            placeholder="Senha atual"
          />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />
          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
          />

          <Button type="submit">Confirmar Mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
