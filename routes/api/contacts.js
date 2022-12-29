const express = require('express');
const router = express.Router();

const controller = require("../../controllers/contacts");
const { validateBody, authenticate } = require('../../middlewares/index');
const { addSchema, patchSchema } = require('../../Schemas/index');

router.get('/', authenticate, controller.getContacts);

router.get('/:contactId', authenticate, controller.getContactById);

router.post('/', authenticate, validateBody(addSchema), controller.postContact);

router.delete('/:contactId', authenticate, controller.deleteContact);

router.put('/:contactId', authenticate, validateBody(addSchema), controller.putContact);

router.patch('/:contactId/favorite', authenticate, validateBody(patchSchema), controller.updateStatusContact);

module.exports = router;
