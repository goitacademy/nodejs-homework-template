// routes/api/contacts.js

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const listContacts = require('../../controllers/listContacts');
const getContactById = require('../../controllers/getContactById');
const addContact = require('../../controllers/addContacts');
const removeContact = require('../../controllers/removeContacts');
const updateContact = require('../../controllers/updateContact');
const updateStatusContact = require('../../controllers/updateStatusContact');
const authController = require('../../controllers/authController');
const verifyToken = require('../../middleware/authMiddleware');

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

router.post('/login', authController.login);

router.post('/signup', authController.signup);

router.get('/', verifyToken, (req, res) => {
  listContacts(req, res);
});

router.get('/:id', verifyToken, (req, res) => {
  getContactById(req, res);
});

router.post('/', verifyToken, (req, res) => {
  const { error } = addContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  addContact(req, res);
});

router.delete('/:id', verifyToken, (req, res) => {
  removeContact(req, res);
});

router.put('/:id', verifyToken, (req, res) => {
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  updateContact(req, res);
});

router.patch('/:id/favorite', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  console.log('Received PATCH request:', { id, favorite });

  if (favorite === undefined && typeof favorite !== 'boolean') {
    console.log(
      'Error: Missing or invalid field "favorite" in the request body'
    );
    return res
      .status(400)
      .json({ message: 'missing or invalid field favorite' });
  }

  try {
    console.log(`Received PATCH request for contact with id: ${id}`);

    const updatedContact = await updateStatusContact(id, { favorite });

    if (!updatedContact) {
      console.log(`Contact not found for id: ${id}`);
      return res.status(404).json({ message: 'Contact not found' });
    }

    console.log('Contact updated successfully:', updatedContact);

    res.status(200).json({
      status: 'success',
      code: 200,
      data: { contact: updatedContact },
    });
  } catch (error) {
    console.error('Error updating contact status:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
