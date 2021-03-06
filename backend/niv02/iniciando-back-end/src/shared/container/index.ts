import { container } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointmets/repositories/IAppontmentsRepository';
import AppointmentsRepository from '@modules/appointmets/infra/typeorm/repositories/AppoitmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationRepository';

import '@modules/users/providers';
import './providers';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokenRepository>(
  'UsersTokenRepository',
  UserTokenRepository
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
);
