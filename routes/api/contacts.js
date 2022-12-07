const express = require('express');

const { HttpError } = require('../../helpers');
const {
  contacts: {
    listContacts,
    getById,
    removeContact,
    addContact,
    updateContact
  },
  contactSchema: {
    contactSchemaAdd,
    contactSchemaUpdate
  },
} = require('../../models/contacts');

const router = new express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();

    if (result.length > 0) {
      return res.json(result);
    }

    res.status(204).json({ message: 'No Content' });
  }
  catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await getById(contactId);
    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  }
  catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;

    if (!Object.keys(body).length) {
      throw HttpError(400, 'Missing fields');
    }

    const { error } = contactSchemaAdd.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await addContact(body);
    res.status(201).json(result);
  }
  catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {
      body,
      params: { contactId }
    } = req;

    if (!Object.keys(body).length) {
      throw HttpError(400, 'Missing fields');
    }

    const { error } = contactSchemaAdd.validate(body);
    if (error) {
      throw HttpError(400, `${error.message}`);
    }

    const result = await updateContact(contactId, body);
    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  }
  catch (error) {
    next(error);
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const {
      body,
      params: { contactId }
    } = req;

    if (!Object.keys(body).length) {
      throw HttpError(400, 'Missing fields');
    }

    const { error } = contactSchemaUpdate.validate(body);
    if (error) {
      throw HttpError(400, `${error.message}`);
    }

    const result = await updateContact(contactId, body);
    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  }
  catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await removeContact(contactId);
    if (!result) {
      throw HttpError(404);
    }

    res.json(`Contact by 'Id' - '${contactId}' deleted`);
  }
  catch (error) {
    next(error);
  }
})

module.exports = router;

