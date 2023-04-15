const express = require('express')

const router = express.Router();

const ctrl = require("../../controllers/contacts")

// const validateBody = require("../../middlewares/validateBody")

const schema  = require("../../schemas");



router.get('/', ctrl.getAll );

// router.get('/:contactId',ctrl.getContact);

// router.post('/',validateBody(schema.addSchema), ctrl.addContact);

// router.delete('/:contactId', ctrl.deleteContact);

// router.put('/:contactId',validateBody(schema.updateSchema), ctrl.updateContact );


module.exports = router;
