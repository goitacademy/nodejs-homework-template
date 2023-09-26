const express = require('express');
const contactsControllers = require('../../controllers');
const { isValidId } = require('../../middlewares');

const router = express.Router();

// Routes
// Get All
// Get One
// Add
// Update One
// Remove

router.get('/', contactsControllers.getAll);

router.get('/:contactId', isValidId, contactsControllers.getById);

router.post('/', contactsControllers.add);

router.delete('/:contactId', isValidId, contactsControllers.deleteById);

router.put('/:contactId', isValidId, contactsControllers.updateById);

module.exports = router;
