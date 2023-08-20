const express = require('express');
const ctrl = require('../../controllers/contacts');
// const validateBody = require('../../middlewares/validateBody');
// const {schema} = require ('../../schemas/contacts')

const router = express.Router();




router.get('/', ctrl.getContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', ctrl.postContact);

router.delete('/:contactId', ctrl.deleteContact);

router.put('/:contactId', ctrl.putContact);


module.exports = router
