const express = require('express');
const contactsController = require('../controllers/contacts.controller');
const { validateBody, isValidId } = require('../middlewares');
const { schemas } = require('../models/contactsModel');

const router = express.Router();

// @desc    Create Contact
// @route 	POST /api/contacts
// @access  Public
router.post('/', validateBody(schemas.createSchema), contactsController.create);

// @desc    Get all Contacts
// @route 	GET /api/contacts
// @access  Public
router.get('/', contactsController.findAll);

// @desc    Get Contact by id
// @route 	GET /api/contacts/:id
// @access  Public
router.get('/:id', isValidId, contactsController.findOne);

// @desc    Update Contact
// @route 	PUT /api/contacts/:id
// @access  Public
router.put('/:id', isValidId, validateBody(schemas.createSchema), contactsController.update);

// @desc    Update Contact Favorite
// @route 	PATCH /api/contacts/:id
// @access  Public
router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), contactsController.updateFavorite);

// @desc    Remove Contact
// @route 	DELETE /api/contacts/:id
// @access  Public
router.delete('/:id', isValidId, contactsController.remove);

module.exports = router;