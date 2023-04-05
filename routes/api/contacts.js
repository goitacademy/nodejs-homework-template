const express = require('express')

const router = express.Router();

const ctrl = require("../../controllers/contacts")

const validateBody = require("../../middlewares/validateBody")

const schema  = require("../../schemas/contacts");

router.get('/', ctrl.getAll );

router.get('/:contactId',ctrl.getContact);

router.post('/',validateBody(schema.joiSchema), ctrl.addContact);

router.delete('/:contactId', ctrl.deleteContact);

router.put('/:contactId', ctrl.updateContact );


module.exports = router;
