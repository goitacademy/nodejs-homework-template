const express = require('express');

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validateBody } = require('../../middlewares/validateBody');
const schemas = require('../../schemas/contacts');

router.get('/', ctrl.getAllContacts);

router.get('/:id', ctrl.getByID);

router.post('/', validateBody(schemas.addSchema), ctrl.postContact);

router.delete('/:id', ctrl.deleteContact);

router.put('/:id', validateBody(schemas.addSchema), ctrl.updateById);

module.exports = router;