const express = require('express');
const controller = require("../../controllers/contacts");
const { validateBody } = require('../../middlewares/index');
const { schemas } = require('../../Schemas/index');

const router = express.Router();

router.get('/', controller.getContacts);

router.get('/:contactId', controller.getContactById);

router.post('/', validateBody(schemas.addSchema), controller.postContact);

router.delete('/:contactId', controller.deleteContact);

router.put('/:contactId', validateBody(schemas.addSchema), controller.putContact);

router.patch('/:contactId/favorite', validateBody(schemas.patchSchema), controller.updateStatusContact);

module.exports = router;
