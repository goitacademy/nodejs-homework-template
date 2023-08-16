import express from 'express';

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  patchContact,
} from './../../models/contacts.js';

export const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();

    return res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while getting the contact list: ${err}`);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  console.log('this is id: ', id);
  try {
    const contact = await getContactById(id);

    return res.json({
      status: 'success',
      code: 200,
      data: { contact },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while getting the contact: ${err}`);
  }
});

router.post('/', async (req, res, next) => {
  const body = req.body;

  if (Object.keys(body).length === 0) {
    return res.status(400).json('Error! Missing fields! Empty request is not allowed');
  }

  try {
    const contact = await addContact(body);

    return res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while adding the contact: ${err}`);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const isContactRemoved = await removeContact(id);

    return res.status(200).json({
      message: `Contact with ID ${id} has been successfully removed.`,
    });
  } catch (err) {
    res.status(500).json(`An error occurred while removing the contact: ${err}`);
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  if (Object.keys(body).length === 0) {
    return res.status(400).json('Error! Missing fields! Empty request is not allowed');
  }

  try {
    const updatedContact = await updateContact(id, body);

    return res.json({
      status: 'success',
      code: 200,
      data: { updatedContact },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while updating the contact: ${err}`);
  }
});

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  if (!('favorite' in body) || Object.keys(body).length === 0) {
    return res.status(400).json('Error! Missing field favorite!');
  }

  try {
    const updatedContact = await patchContact(id, body);

    return res.json({
      status: 'success',
      code: 200,
      data: { updatedContact },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while updating the contact: ${err}`);
  }
});
