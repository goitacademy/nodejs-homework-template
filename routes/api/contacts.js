const express = require('express');
const router = express.Router();
const contactsController = require('../../controller/contactsController');
const auth = require('../../auth/userAuth');

router.get('/', auth, contactsController.get);

router.get('/:id', auth, contactsController.getById);

router.post('/', auth, contactsController.create);

router.delete('/:id', auth, contactsController.removeById);

router.put('/:id', auth, contactsController.update);

router.patch('/:id/favorite', auth, contactsController.updateStatus);

module.exports = router;
