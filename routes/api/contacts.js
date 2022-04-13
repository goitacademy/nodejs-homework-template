const express = require('express');
const contactsRepository = require('../../repository/contacts');
const { schemaCreateContact } = require('./contacts-validation');
const { validateBody } = require('../../middlewares/validatioin');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await contactsRepository.listContacts();
  res.json({ status: 'success', code: 200, payload: { contacts } });
});

router.get('/:contactId', async (req, res, next) => {
  const contact = await contactsRepository.getContactById(req.params.contactId);
  if (contact) {
    return res.json({ status: 'success', code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not found' });
});

router.post('/', validateBody(schemaCreateContact), async (req, res, next) => {
  const contact = await contactsRepository.addContact(req.body);
  res.status(201).json({ status: 'success', code: 201, payload: { contact } });
});

router.delete('/:contactId', async (req, res, next) => {
  const contact = await contactsRepository.removeContact(req.params.contactId);
  if (contact) {
    return res.json({ status: 'success', code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not found' });
});

router.put(
  '/:contactId',
  validateBody(schemaCreateContact),
  async (req, res, next) => {
    const contact = await contactsRepository.updateContact(
      req.params.contactId,
      req.body,
    );
    if (contact) {
      return res.json({ status: 'success', code: 200, payload: { contact } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  },
);

router.patch('/:contactId/name', async (req, res, next) => {
  const contact = await contactsRepository.updateContact(
    req.params.contactId,
    req.body,
  );
  if (contact) {
    return res.json({ status: 'success', code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not found' });
});

module.exports = router;
