const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateStatusContact,
} = require('../../controllers/contacts.controller');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await listContacts(req.limit));
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const searchedContact = await getContactById(req.params.contactId);
    if (!searchedContact) {
      res
        .status(404)
        .send(`Contact with id ${req.params.contactId} can't be found`);
    }
    res.status(200).json(searchedContact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).json(await addContact(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactById = req.params.contactId;
    const searchedContact = await getContactById(contactById);

    if (!searchedContact) {
      res.status(404).send(`Contact with id ${contactById} can't be found`);
      return;
    }
    await removeContact(contactById);
    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId/favorite', async (req, res, next) => {
  try {
    const contactById = req.params.contactId;
    const contactBody = req.body;
    const searchedContact = await getContactById(contactById);
    if (!searchedContact) {
      res.status(404).send(`Contact with id ${contactById} can't be found`);
    }
    if (!contactBody) {
      res.status(404).send({ message: 'missing field favorite' });
    }
    res.status(200).json(await updateStatusContact(contactById, req.body));
  } catch (error) {
    next({ message: 'Not found' }, error);
  }
});

module.exports = router;
