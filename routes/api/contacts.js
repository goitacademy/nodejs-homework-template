const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await listContacts());
  } catch (error) {
    console.error(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const searchedContact = await getContactById(req.params.contactId);

    searchedContact
      ? res.status(200).json(searchedContact)
      : res
          .status(404)
          .send(`Contact with id ${req.params.contactId} can't be found`);
  } catch (error) {
    console.error(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).json(await addContact(req.body));
  } catch (error) {
    console.error(error);
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
    console.error(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const contactById = req.params.contactId;
    const searchedContact = await getContactById(contactById);
    searchedContact
      ? res.status(200).json(await updateContact(contactById, req.body))
      : res.status(404).send(`Contact with id ${contactById} can't be found`);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
