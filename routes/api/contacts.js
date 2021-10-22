const express = require("express");

const {controllerWrapper, validation} = require("../../middlewares");
const {joiSchema} = require("../../models/contacts/contact");
const {contacts: ctrl} = require("../../controllers/contacts");

const router = express.Router();
router.get('/',controllerWrapper(ctrl.listContacts));

router.get('/:id',controllerWrapper (ctrl.getContactById));

router.post('/',validation(joiSchema), controllerWrapper(ctrl.addContact));

router.put('/:id', validation(joiSchema),controllerWrapper(ctrl.updateById));

router.patch('/:id', controllerWrapper(ctrl.updateStatusContact))

router.delete('/:id', controllerWrapper(ctrl.removeContact));

module.exports = router
