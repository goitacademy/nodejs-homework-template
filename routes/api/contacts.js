import express from 'express';

import { checkContactId } from './../../config/config-mongoose.js';

export const contactsRouterFunction = contactsService => {
  const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updatedStatusContact,
  } = contactsService;

  const contactsRouter = express.Router();

  const paginatedResults = (array, page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = array.slice(startIndex, endIndex);
    return results;
  };

  contactsRouter.get('/', async (req, res, next) => {
    const { id: userId } = req.user;
    try {
      const contacts = await listContacts(userId);
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

  contactsRouter.get('/:id', checkContactId, async (req, res, next) => {
    const { id: userId } = req.user;
    const { id: contactId } = req.params;

    try {
      const contact = await getContactById(userId, contactId);
      if (contact === 404) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Contact not found',
        });
      }
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { contact },
      });
    } catch (err) {
      res.status(500).json(`An error occurred while getting the contact: ${err}`);
    }
  });

  contactsRouter.post('/', async (req, res, next) => {
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

  contactsRouter.delete('/:id', checkContactId, async (req, res, next) => {
    const { id: userId } = req.user;
    const { id: contactId } = req.params;

    try {
      const contact = await removeContact(contactId, userId);
      if (contact === 404) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Contact not found',
        });
      }

      return res.status(200).json({
        message: `Contact with ID ${contactId} has been successfully removed.`,
      });
    } catch (err) {
      res.status(500).json(`An error occurred while removing the contact: ${err}`);
    }
  });

  contactsRouter.put('/:id', checkContactId, async (req, res, next) => {
    const { id: userId } = req.user;
    const { id: contactId } = req.params;
    const { body } = req;

    if (Object.keys(body).length === 0) {
      return res.status(400).json('Error! Missing fields! Empty request is not allowed');
    }

    try {
      const updatedContact = await updateContact(contactId, body, userId);
      if (updatedContact === 404) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Contact not found',
        });
      }
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { updatedContact },
      });
    } catch (err) {
      res.status(500).json(`An error occurred while updating the contact: ${err}`);
    }
  });

  contactsRouter.patch('/:id', checkContactId, async (req, res, next) => {
    const { id: userId } = req.user;
    const { id: contactId } = req.params;
    const { body } = req;
    const { favorite } = body;

    if (!('favorite' in body) || Object.keys(body).length === 0) {
      return res.status(400).json('Error! Missing field favorite!');
    }

    try {
      const updatedStatus = await updatedStatusContact(contactId, favorite, userId);
      if (updatedStatus === 404) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Contact not found',
        });
      }
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { updatedStatus },
      });
    } catch (err) {
      res.status(500).json(`An error occurred while updating the contact: ${err}`);
    }
  });

  return contactsRouter;
};
