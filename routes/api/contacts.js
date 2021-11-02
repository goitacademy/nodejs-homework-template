const express = require('express');
const router = express.Router();
const contactsAPI = require('../../model/index');
const schema = require('../../validator/validator');

router.get('/contacts', async (req, res, next) => {
  try {
    const contacts = await contactsAPI.listContacts();

    if (!contacts) return res.status(500).json({ message: 'Sorry, no contacts found' });

    res.status(200).send(contacts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/contacts/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;

    // check validity
    schema
      .isValid({
        id: contactId,
      })
      .then(valid => {
        !valid && res.status(400).json({ message: 'ID is not valid' });
      });

    const contact = await contactsAPI.getContactById(contactId);
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/contacts', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    // check validity
    schema.body
      .isValid({
        name,
        email,
        phone,
      })
      .then(valid => {
        !valid && res.status(400).json({ message: 'Request is not valid' });
      });

    const contact = await contactsAPI.addContact({ name, email, phone });

    if (!contact) return res.status(500);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/contacts/:contactId', async (req, res, next) => {
  try {
    const conactId = req.params.contactId;
    const contact = await contactsAPI.removeContact(conactId);
    if (!contact)
      return res.status(404).json({ message: `Contact with id ${conactId} was not found` });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/contacts/:contactId', async (req, res, next) => {
  try {
    const body = req.body;
    const contactId = req.params.contactId;

    //check validity
    schema.isValid(body).then(valid => {
      !valid && res.status(400).json({ message: 'Request is not valid' });
    });
    const contact = await contactsAPI.updateContact(contactId, body);

    if (!contact) return res.status(404).json({ message: 'Such contact was not found' });

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
