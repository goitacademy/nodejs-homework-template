const express = require('express');

const {
  status,
  answer,
  messageStatusCode,
  paths,
  schemaValidatePost,
  schemaValidatePut,
} = require('../../utils');
const Contacts = require('../../models/contacts/contacts');
const { validateBody } = require('../../middleware');

const contacts = new Contacts();
const router = express.Router();

router.get(paths.main, async (req, res, next) => {
  res.json(answer(status.success, 200, await contacts.listContacts()));
});

router.get(paths.contactId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await contacts.getContactById(id);
  if (contact) {
    res.json(answer(status.success, 200, contact));
  } else {
    res.status(404).json(answer(status.error, 404, messageStatusCode[404]));
  }
});

router.post(
  paths.main,
  validateBody(schemaValidatePost, answer, status),
  async (req, res, next) => {
    const contact = await contacts.addContact(req.body);
    res.status(201).json(answer(status.error, 201, contact));
  }
);

router.delete(paths.contactId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await contacts.removeContact(id);
  if (contact) {
    res.json(answer(status.success, 200, messageStatusCode[200]));
  } else {
    res.status(404).json(answer(status.error, 404, messageStatusCode[404]));
  }
});

router.put(
  paths.contactId,
  validateBody(schemaValidatePut, answer, status),

  async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    const contact = await contacts.updateContact(body, id);
    if (contact) {
      res.json(answer(status.success, 200, contact));
    } else {
      res.status(404).json(answer(status.error, 404, messageStatusCode[404]));
    }
  }
);

module.exports = router;
