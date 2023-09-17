const express = require('express');
const contactsController = require('../../controllers/contacts.controller');
const { validateBody } = require('../../valid');
const schemas = require('../../lookLike/contacts.look');

const router = express.Router();

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getOne);

router.post('/', validateBody(schemas.addSchema), contactsController.create);

router.put('/:id', validateBody(schemas.addSchema), contactsController.update);

router.delete('/:id', contactsController.remove);

module.exports = router;