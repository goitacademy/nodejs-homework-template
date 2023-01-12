const express = require('express');

const ctrl = require("../../controllers/contacts");



const { ctrlWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts")

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get('/:id', ctrlWrapper(ctrl.getContactById));

router.post('/', validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.put('/:id', validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateContact));

router.delete('/:id', ctrlWrapper(ctrl.removeContact));


module.exports = router;
