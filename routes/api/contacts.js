const express = require("express");
const contactsControllers = require('../../controllers');


const router = express.Router();

// Routes
router.get('/', contactsControllers.getAll);

router.get('/:contactId', contactsControllers.getById);

router.post('/', contactsControllers.add);

router.delete('/:contactId', contactsControllers.deleteById);

router.put('/:contactId', contactsControllers.updateById);

module.exports = router;
