const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/controllers');


const schemas = require("../../schemas/validateSchema");
const {validateFunc, handleBodyChange} = require("../../middlewares");

router.get('/', ctrl.getAllContacts);

router.get('/:id', ctrl.getById);

router.post('/', validateFunc(schemas.addSchema), ctrl.addContact);

router.put( "/:id", handleBodyChange, validateFunc(schemas.addUpdSchema), ctrl.updContactById );

router.delete('/:id',ctrl.deleteContactById);


module.exports = router;
