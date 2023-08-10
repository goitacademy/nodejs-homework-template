const express = require('express');
const router = express.Router();

const controllers = require('../../controllers/contacts');
const {validateBody} = require('../../middlewares');
const schema = require('../../schemas/contactSchema');

router.get('/', controllers.getAll);

router.get('/:id', controllers.getById);

router.post('/', validateBody(schema), controllers.addContact);

router.delete('/:id', controllers.removeContact);

router.put('/:id',  validateBody(schema), controllers.updateContact);

module.exports = router
