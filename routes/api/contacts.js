/* eslint-disable semi */
const express = require('express');
const router = express.Router();

const { contactsSchema } = require('../../schemas/');
const contactsOperation = require('../../model/contacts/');

// возвращает массив всех контактов в json-формате со статусом 200
router.get('/', async (req, res, next) => {
  try {
    const result = await contactsOperation.getAllContacts();
    res.json({
      status: 'sucsess',
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

// если такой id есть, возвращает обьект контакта в json-формате со статусом 200
// если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperation.getContactById(contactId);
    // проверка на наличие контакта с определенным Id, если такого контакта нет, то отправляем ответ сервера...
    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    // ответ сервера если контакт найден
    res.json({
      status: 'sucsess',
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

// По результату работы функции возвращает объект с добавленным id {id, name, email, phone} и статусом 201
router.post('/', async (req, res, next) => {
  try {
    const body = req.body; // тело запроса с параметрвми объекта контакт

    const { error } = contactsSchema.validate(body);
    if (error) {
      const err = new Error(error.message);
      err.status = 404;
      throw err;
    }

    const result = await contactsOperation.addContact(body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// если такой id есть, возвращает json формата {"message": "contact deleted"} и статусом 200
// если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperation.removeContactById(contactId);
    if (!result) {
      const error = new Error(`Contacts width id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'succcess',
      code: 200,
      message: 'Success delete',
    });
  } catch (error) {
    next(error);
  }
});

// По результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404
router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body; // тело запроса с параметрвми объекта контакт

    const { error } = contactsSchema.validate(body);
    if (error) {
      const err = new Error(error.message);
      err.status = 404;
      throw err;
    }

    const result = await contactsOperation.updateContactById(contactId, body);
    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
