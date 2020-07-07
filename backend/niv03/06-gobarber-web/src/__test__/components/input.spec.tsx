import React from 'react';

import { render, fireEvent, wait } from '@testing-library/react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render any input', () => {
    const { getAllByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getAllByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('it should render hightlight on focus in any input', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const conatinerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(conatinerElement).toHaveStyle('border-color: #ff9000');
      expect(conatinerElement).toHaveStyle('color: #ff9000');
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(conatinerElement).not.toHaveStyle('border-color: #ff9000');
      expect(conatinerElement).not.toHaveStyle('color: #ff9000');
    });
  });

  it('it should keep input border hightlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const conatinerElement = getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'johndow@gmail.com' },
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(conatinerElement).toHaveStyle('color: #ff9000');
    });
  });
});
