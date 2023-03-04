const express = require("express")

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const { contacts: ctrl } = require("../../controllers");

const validateMiddlewares = validation(contactSchema);

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:id', ctrl.getById);

router.post('/', validateMiddlewares, ctrl.addContact);

router.put('/:id', validateMiddlewares, ctrl.updateContact);

router.delete('/:id', ctrl.removeContact);

module.exports = router;
