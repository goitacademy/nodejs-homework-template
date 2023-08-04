const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/controllers');


const schemas = require("../../schemas/validateSchema");
const validateFunc = require("../../middlewares/validateFunc");

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getById);

router.post('/', validateFunc(schemas.addSchema), ctrl.addContact);

router.put("/:contactId", validateFunc(schemas.addSchema), ctrl.updContactById);

router.delete('/:contactId',ctrl.deleteContactById);


module.exports = router;
