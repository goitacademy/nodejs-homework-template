const express = require('express');
const router = express.Router();
const ctrlContact = require('../../controller/contacts');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

router.get('', authenticate , ctrlContact.get);

router.get('/:id', authenticate , ctrlContact.getById);

router.post('', authenticate , validateBody(schemas.addSchema), ctrlContact.create);

router.put('/:id', authenticate , validateBody(schemas.addSchema), ctrlContact.update);

router.patch('/:id/status', authenticate , validateBody(schemas.updateFavoriteSchema), ctrlContact.updateStatus);

router.delete('/:id', authenticate , ctrlContact.remove);

module.exports = router;