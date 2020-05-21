import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import IStorageProvider from './StorageProviders/models/IStorageProvider';
import DiskStorProvider from './StorageProviders/implementations/DiskStorageProvider';

import IMailprovider from './EmailProviders/models/IMailProvider';
import EtherealMailProvider from './EmailProviders/implementations/EtherealMailProvider';
import GmailProvider from './EmailProviders/implementations/GmailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import ICacheprovider from './CacheProvider/models/ICacheprovider';
import RedisCacheProvider from './CacheProvider/implementations/RedisCacheProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorProvider
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
);

container.registerInstance<IMailprovider>(
  'MailProvider',

  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(GmailProvider)
);

container.registerSingleton<ICacheprovider>(
  'CacheProvider',
  RedisCacheProvider
);
