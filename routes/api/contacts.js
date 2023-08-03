import express from 'express';
import * as api from '../../models/contacts.js';

export const router = express.Router();

const STATUS = {
  ok: 200,
  created: 201,
  badRequest: 400,
  notFound: 404,
  alreadyExists: 409,
  invalidData: 422,
};

const CODE = {
  notFound: { message: 'Not found' },
  deleted: { message: 'Contact deleted' },
};

/* 
  GET
  получение списка всех контактов 
*/
router.get('/', async (req, res, next) => {
  res.status(STATUS.ok).json(await api.listContacts());
});

/* 
  GET id
  получение контакта с заднным id 
*/
router.get('/:id', async ({ params }, res) => {
  const { id } = params;
  const data = await api.getContactById(id);
  res.status(data ? STATUS.ok : STATUS.notFound).json(data ?? CODE.notFound);
});

/*
  DELETE id
  удаление контакта с заданным id
*/
router.delete('/:id', async ({ params }, res) => {
  const { id } = params;
  const data = await api.removeContact(id);

  res
    .status(data ? STATUS.ok : STATUS.notFound)
    .json(data ? CODE.deleted : CODE.notFound);
});

/*  
  POST
  добавление нового контакта
*/
router.post('/', async ({ body }, res) => {
  try {
    // добавляем контакт в БД
    res.status(STATUS.created).json(await api.addContact(body));
  } catch ({ code, message }) {
    const status =
      code === 'ERR_INVALID_DATA' ? STATUS.badRequest : STATUS.alreadyExists;
    res.status(status).json({ message });
  }
});

/*  
  PUT id
  изменение контакта с заданным id
*/
router.put('/:id', async (req, res, next) => {
  res.json({ message: 'template message' });
});
