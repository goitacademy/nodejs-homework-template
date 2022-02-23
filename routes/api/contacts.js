const express = require('express');
const methods = require('../../models');
const {
  schemaValidatePOST,
  schemaValidatePUT,
  addUniqueId,
  getField,
  isExistUser,
  isExistUserById,
  messageStatusCode,
  paths,
} = require('../../utils');

const router = express.Router();

router.get(paths.main, async (req, res, next) => {
  res.status(200).json(await methods.listContacts());
});

router.get(paths.contactId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await methods.getContactById(id);

  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json(messageStatusCode[404]);
  }
});

router.post(paths.main, async (req, res, next) => {
  try {
    const isValidBody = await schemaValidatePOST.validateAsync(req.body);
    const contact = addUniqueId(isValidBody);
    const isThisExistUser = await isExistUser(contact);
    if (isThisExistUser) {
      res.status(403).json(messageStatusCode[403]);
    } else {
      methods.addContact(contact);
      res.status(201).json(contact);
    }
  } catch (error) {
    const field = getField(error.message);
    if (field) {
      res
        .status(400)
        .json(messageStatusCode[400].missing_required.errorMessage(field));
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

router.delete(paths.contactId, async (req, res, next) => {
  const { id } = req.params;

  const isThisExistContact = await isExistUserById(id);
  if (isThisExistContact) {
    await methods.removeContact(id);
    res.status(200).json(messageStatusCode[200]);
  } else {
    res.status(404).json(messageStatusCode[404]);
  }
});

router.put(paths.contactId, async (req, res, next) => {
  try {
    const { id } = req.params;
    await isExistUserById(id);
    if (!Object.keys(req.body).length) {
      res.status(400).json(messageStatusCode[400].missing_fields);
    } else {
      const isValidBody = await schemaValidatePUT.validateAsync(req.body);
      const updatingContact = await methods.updateContact(id, isValidBody);
      res.status(200).json(updatingContact);
    }
  } catch (error) {
    res.status(404).json(messageStatusCode[404]);
  }
});

module.exports = router;
