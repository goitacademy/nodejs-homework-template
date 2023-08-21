import express from 'express';

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updatedStatusContact,
} from './../../models/contacts.js';

import { auth } from '../../config/config-passport.js';

export const contactsRouter = express.Router();

const paginatedResults = (array, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = array.slice(startIndex, endIndex);
  return results;
};

contactsRouter.get('/', auth, async (req, res, next) => {
  try {
    const { id: userID } = req.user;
    const contacts = await listContacts(userID);
    const { page = 1, limit = 20, favorite } = req.query;
    let filteredContacts = contacts;
    if (favorite === 'true') {
      filteredContacts = contacts.filter(contact => contact.favorite);
    }
    const paginatedContacts = paginatedResults(filteredContacts, page, limit);

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { contacts: paginatedContacts },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: `An error occurred while getting the contact list: ${err}`,
    });
  }
});

contactsRouter.get('/:id', auth, async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: contactId } = req.params;
  try {
    const contact = await getContactById(userId, contactId);

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { contact },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while getting the contact: ${err}`);
  }
});

contactsRouter.post('/', auth, async (req, res, next) => {
  const body = req.body;
  const { id: userId } = req.user;

  if (Object.keys(body).length === 0) {
    return res.status(400).json('Error! Missing fields! Empty request is not allowed');
  }

  try {
    const contact = await addContact(body, userId);

    return res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while adding the contact: ${err}`);
  }
});

contactsRouter.delete('/:id', auth, async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: contactId } = req.params;
  try {
    await removeContact(contactId, userId);

    return res.status(200).json({
      message: `Contact with ID ${contactId} has been successfully removed.`,
    });
  } catch (err) {
    res.status(500).json(`An error occurred while removing the contact: ${err}`);
  }
});

contactsRouter.put('/:id', auth, async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: contactId } = req.params;
  const { body } = req;

  if (Object.keys(body).length === 0) {
    return res.status(400).json('Error! Missing fields! Empty request is not allowed');
  }

  try {
    const updatedContact = await updateContact(contactId, body, userId);

    return res.json({
      status: 'success',
      code: 200,
      data: { updatedContact },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while updating the contact: ${err}`);
  }
});

contactsRouter.patch('/:id', auth, async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: contactId } = req.params;
  const { body } = req;
  const { favorite } = body;

  if (!('favorite' in body) || Object.keys(body).length === 0) {
    return res.status(400).json('Error! Missing field favorite!');
  }

  try {
    const updatedStatus = await updatedStatusContact(contactId, favorite, userId);

    return res.json({
      status: 'success',
      code: 200,
      data: { updatedStatus },
    });
  } catch (err) {
    res.status(500).json(`An error occurred while updating the contact: ${err}`);
  }
});
