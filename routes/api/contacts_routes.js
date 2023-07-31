import express from 'express';

import contactsService from "../../models/contacts.js";

const contactsRouter = express.Router()

contactsRouter.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
})

contactsRouter.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsService.getContactById(contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (err) {
    next(err);
  }
});

contactsRouter.post('/', async (req, res, next) => {
  try {
    const newContact = await contactsService.addContact(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
})

contactsRouter.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsService.getContactById(contactId);
    if (contact) {
      await contactsService.removeContact(contactId);
      res.json({ message: 'contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    next(err);
  }
})

contactsRouter.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const updateContact = await contactsService.updateContact(contactId, req.body);
    res.json(updateContact);
  } catch (err) {
    next(err);
  }
})

export default contactsRouter;
