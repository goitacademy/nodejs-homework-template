const express = require('express');
const contactsController = require('../../controllers/contacts.controller');
const { validateBody } = require('../../middlewares');
const schemas = require('../../schemas/contacts.schema');

const router = express.Router();

// @desc    Get all Contacts
// @route 	GET /api/contacts
// @access  Public
router.get('/', contactsController.getAll);

// @desc    Get Contact by id
// @route 	GET /api/contacts/:id
// @access  Public
router.get('/:id', contactsController.getOne);

// @desc    Create Contact
// @route 	POST /api/contacts
// @access  Public
router.post('/', validateBody(schemas.addSchema), contactsController.create);

// @desc    Update Contact
// @route 	PUT /api/contacts/:id
// @access  Public
router.put('/:id', validateBody(schemas.addSchema), contactsController.update);

// @desc    Remove Contact
// @route 	DELETE /api/contacts/:id
// @access  Public
router.delete('/:id', contactsController.remove);

module.exports = router;
