import { container } from 'tsyringe';
import IStorageProvider from './StorageProviders/models/IStorageProvider';
import DiskStorProvider from './StorageProviders/implementations/DiskStorageProvider';

import IMailprovider from './EmailProviders/models/IMailProvider';
import Mailprovider from './EmailProviders/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorProvider
);

container.registerInstance<IMailprovider>('MailProvider', new Mailprovider());
