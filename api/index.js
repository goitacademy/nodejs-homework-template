const express = require('express');
// const Joi = require('joi');

const router = express.Router();

// const schema = require('../../sevice/schemas/validation')
const ctrlContact = require('../controller');

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().regex(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/).messages({'string.pattern.base': `Phone number must be digits and can contain spaces, dashes, parentheses and can start with +`}).required(),
// });

router.get('/contacts', ctrlContact.get);

router.get('/contacts/:id', ctrlContact.getById);

router.post('/contacts', ctrlContact.create);

router.put('/contacts/:id', ctrlContact.update);

router.patch('/contacts/:id/favorite', ctrlContact.updateFavorite);

router.delete('/contacts/:id', ctrlContact.remove);

module.exports = router;