const express = require('express');

const ctrl = require('../../controllers/contacts');

const {validateBody} = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();


router.get('/', ctrl.getAll);  

router.get('/:contactId', ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.postContactById);

router.put('/:contactId', validateBody(schemas.addSchema), ctrl.putContactById);

router.delete('/:contactId', ctrl.deleteContactById);


module.exports = router;

