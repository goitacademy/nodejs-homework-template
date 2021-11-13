const express = require('express');
const router = express.Router();
const contactsAPI = require('../../model/index');
// const schema = require('../../middlewares/validator/validator');

const {
  getContactByIdValidation,
  postContactValidation,
  putContactValidation,
} = require('../../middlewares/validator/validator');

router.get('/contacts', async (req, res) => {
  try {
    const contacts = await contactsAPI.listContacts();

    if (!contacts) return res.status(500).json({ message: 'Sorry, no contacts found' });

    res.status(200).send(contacts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/contacts/:contactId', getContactByIdValidation, async (req, res, next) => {
  try {
    const contactId = req.params.contactId;

    // // check validity
    // schema
    //   .isValid({
    //     id: contactId,
    //   })
    //   .then(valid => {
    //     !valid && res.status(400).json({ message: 'ID is not valid' });
    //   });

    const contact = await contactsAPI.getContactById(contactId);
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/contacts', postContactValidation, async (req, res, next) => {
  try {
    const body = req.body;

    // check validity
    // schema.isValid(body).then(valid => {
    //   !valid && res.status(400).json({ message: 'Request is not valid' });
    // });

    const contact = await contactsAPI.addContact(body);

    if (!contact) return res.status(500);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/contacts/:contactId', async (req, res) => {
  try {
    const id = req.params.contactId;
    // console.log(id);
    const contact = await contactsAPI.removeContact(id);
    if (!contact) return res.status(404).json({ message: `Contact with id ${id} was not found` });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/contacts/:contactId', putContactValidation, async (req, res, next) => {
  try {
    const body = req.body;
    const contactId = req.params.contactId;

    //check validity
    // schema.isValid(body).then(valid => {
    //   !valid && res.status(400).json({ message: 'Request is not valid' });
    // });
    const contact = await contactsAPI.updateContact(contactId, body);

    if (!contact) return res.status(404).json({ message: 'Such contact was not found' });

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
