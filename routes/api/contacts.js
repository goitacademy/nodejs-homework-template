const express = require('express');
const router = express.Router();
const contactOperation = require('../../model/contacts/index');
const { validation } = require('../../middlewares');
const { contactsSchema } = require('../../shemas');

const validateMiddleware = validation(contactsSchema);

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactOperation.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res) => {
  const contactId = req.params.contactId;
  const contact = await contactOperation.getContactById(contactId);
  if (contact) {
    return res.status(200).json(contact);
  }
  return res.status(404).json({ message: 'Not Found' });
});

router.post('/', validateMiddleware, async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!req.body) {
    return res.status(400).json({ message: 'missing required name field' });
  }
  const contacts = await contactOperation.addContact(name, email, phone);
  return res.status(201).json(contacts);
});

router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const findContact = await contactOperation.getContactById(contactId);

  if (findContact) {
    await contactOperation.removeContact(contactId);
    return res.status(200).json({ message: 'contact deleted' });
  }
  return res.status(404).json({ message: 'Not Found' });
});

router.put('/:id', validateMiddleware, async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const body = req.body;
    const findContact = await contactOperation.getContactById(contactId);
    if (findContact) {
      const contact = await contactOperation.updateContacts(contactId, body);
      return res
        .status(200)
        .json({ status: 'succes', code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
