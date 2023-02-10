const express = require('express');
const router = express.Router();
const contactsController = require('../../controller/contactsController');

router.get('/', contactsController.get);

router.get('/:id', contactsController.getById);

router.post('/', contactsController.create);

router.delete('/:id', contactsController.removeById);

router.put('/:id', contactsController.update);

router.patch('/:id/favorite', contactsController.updateStatus);

module.exports = router;
