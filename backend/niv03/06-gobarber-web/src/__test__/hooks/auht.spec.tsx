import { renderHook, act } from '@testing-library/react-hooks'; //eslint-disable-line
import MockAdapter from 'axios-mock-adapter'; //eslint-disable-line
import { useAuth, AuthProvider } from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to signin', async () => {
    const apiResponse = {
      user: {
        id: 'user123453',
        name: 'John',
        email: 'johndow@gmail.com',
      },
      token: 'token-123',
    };
    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSPy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.sigIn({
      email: 'johndow@gmail.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSPy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token,
    );
    expect(setItemSPy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user.email).toEqual('johndow@gmail.com');
  });

  it('should restore save data from storeage when auto inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user123453',
            name: 'John',
            email: 'johndow@gmail.com',
          });
        default:
          return null;
      }
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('johndow@gmail.com');
  });

  it('should be able to signout', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user123453',
            name: 'John',
            email: 'johndow@gmail.com',
          });
        default:
          return null;
      }
    });

    const removeSession = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.sigOut();
    });
    expect(removeSession).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user ', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: 'user123453',
      name: 'John',
      email: 'johndow@gmail.com',
      avatar_url: 'image-jpg',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );

    expect(result.current.user).toEqual(user);
  });
});
