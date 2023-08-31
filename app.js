import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { contactsRouterFunction } from './routes/api/contacts.js';
import { usersRouterFunction } from './routes/api/users.js';
import passport from './config/config-passport.js';
import { auth } from './config/config-passport.js';

export const makeApp = controllerDatabase => {
  const { contactsService, usersService } = controllerDatabase;
  const app = express();
  const logger = morgan;

  const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

  app.use(logger(formatsLogger));
  app.use(cors());
  app.use(express.json());

  app.use('/api/contacts', auth, contactsRouterFunction(contactsService));
  app.use('/api/users', usersRouterFunction(usersService));
  app.use(passport.initialize());
  app.use(express.static('public'));

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
  });

  return app;
};
