import {Request, Response, NextFunction} from 'express';
import {BadRequest} from 'http-errors';
import {responseErrorOrNext, validateContact}  from '../helpers';

const addContactValidation = async (req : Request, res : Response, next : NextFunction) => {
  const requiredFields = ['name', 'email', 'phone'];

  const {error} = validateContact(req.body, requiredFields);

  responseErrorOrNext(error, res, next);
};

const updateContactValidation = async (req : Request, res : Response, next : NextFunction) => {
  const {error} = validateContact(req.body);

  if (Object.keys(req.body).length === 0) {
    next(new BadRequest('Empty request\'s body'));
  }

  responseErrorOrNext(error, res, next);
};

const updateStatusContactValidation = async (req : Request, res : Response, next : NextFunction) => {
  const {error} = validateContact(req.body, ['favorite']);

  responseErrorOrNext(error, res, next);
};

export {
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
};
