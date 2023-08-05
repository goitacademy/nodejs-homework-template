import HttpError from '../helpers/HttpError.js';
import { HTTP_STATUS } from '../helpers/helpers.js';

import {
  addedContactScheme,
  updatedContactScheme,
} from '../schemas/contactsSchemas.js';

export const validateAddedBody = () => async (req, res, next) => {
  try {
    await addedContactScheme.validateAsync(req.body);
    next();
  } catch ({ message }) {
    next(HttpError(HTTP_STATUS.badRequest, message));
  }
};

export const validateUpdatedBody = () => async (req, res, next) => {
  try {
    // сохраняем валидные поля для работы с ними в контроллере
    req.validatedBody = await updatedContactScheme.validateAsync(req.body);
    next();
  } catch ({ message }) {
    next(HttpError(HTTP_STATUS.badRequest, message));
  }
};
