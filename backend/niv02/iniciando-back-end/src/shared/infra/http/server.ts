import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

// app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log(' 🕵️‍  Server started on port 3333...');
});
