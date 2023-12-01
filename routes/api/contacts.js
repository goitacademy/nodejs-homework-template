const express = require('express');


const router = express.Router();
const controller = require("../../controllers/contacts")


router.get('/', controller.getAll);

router.get('/:contactId', controller.getById);

router.post('/', controller.addNewContact);

router.delete("/:contactId", controller.deleteById);

router.put('/:contactId', controller.updateById);



module.exports = router;

