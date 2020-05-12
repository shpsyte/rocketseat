import { container } from 'tsyringe';
import IStorageProvider from './StorageProviders/models/IStorageProvider';
import DiskStorProvider from './StorageProviders/implementations/DiskStorageProvider';

import IMailprovider from './EmailProviders/models/IMailProvider';
import Mailprovider from './EmailProviders/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorProvider
);

container.registerInstance<IMailprovider>('MailProvider', new Mailprovider());

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
);
