import * as express from 'express';

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from './../../models/contacts.js';

export const router = express.Router();
const sendErrorResponse = (res, status, message) => {
  res.status(status).json({ message });
};

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    if (!contacts) {
      sendErrorResponse(res, 404, `Contact list not found`);
      return false;
    }
    res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    });
  } catch (err) {
    sendErrorResponse(res, 500, `An error occurred while getting the contact list: ${err}`);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);
    if (!contact) {
      sendErrorResponse(res, 404, `Contact with id ${id} not found`);
      return false;
    }
    res.json({
      status: 'success',
      code: 200,
      data: { contact },
    });
  } catch (err) {
    sendErrorResponse(res, 500, `An error occurred while getting the contact: ${err}`);
  }
});

router.post('/', async (req, res, next) => {
  const body = req.body;
  try {
    const contact = await addContact(body);
    if (!contact) {
      sendErrorResponse(res, 404, `Contact not found`);
      return false;
    }
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact },
    });
  } catch (err) {
    sendErrorResponse(res, 500, `An error occurred while adding the contact: ${err}`);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const isContactRemoved = await removeContact(id);
    if (!isContactRemoved) {
      sendErrorResponse(res, 404, `Contact with id ${id} not found`);
      return false;
    }
    res.status(204).json({
      message: `Contact with ID ${id} has been successfully removed.`,
    });
  } catch (err) {
    sendErrorResponse(res, 500, `An error occurred while removing the contact: ${err}`);
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updatedContact = await updateContact(id, body);
    if (!updatedContact) {
      sendErrorResponse(res, 404, `Contact with id ${id} not found`);
      return false;
    }
    res.json({
      status: 'success',
      code: 200,
      data: { updatedContact },
    });
  } catch (err) {
    sendErrorResponse(res, 500, `An error occurred while updating the contact: ${err}`);
  }
});
