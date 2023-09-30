const express = require('express');
const contactsController = require('../controllers/contacts.controller');
const { validateBody, isValidId } = require('../middlewares');
const { schemas } = require('../models/contactsModel');

const router = express.Router();

router.post('/', validateBody(schemas.createSchema), contactsController.create);

router.get('/', contactsController.findAll);

router.get('/:id', isValidId, contactsController.findOne);

router.put('/:id', isValidId, validateBody(schemas.createSchema), contactsController.update);

router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), contactsController.updateFavorite);

router.delete('/:id', isValidId, contactsController.remove);

module.exports = router;