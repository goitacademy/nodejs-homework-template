const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
} = require('../../controllers/index');

const { schemaContactJoi } = require('../../model/contact');

const validation = (schema) => {
  const contactValidation = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({ message: 'missing required name field' });
    }
    next();
  };
  return contactValidation;
};

router.get('/', getAllContacts);

router.get('/:contactId', getContactById);

router.post('/', validation(schemaContactJoi), addContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', validation(schemaContactJoi), updateContact);

router.patch('/:contactId/favorite', updateFavorite);

module.exports = router;
