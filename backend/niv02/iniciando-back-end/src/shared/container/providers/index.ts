import { container } from 'tsyringe';
import IStorageProvider from './StorageProviders/models/IStorageProvider';
import DiskStorProvider from './StorageProviders/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorProvider
);
