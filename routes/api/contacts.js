const express = require('express');


const router = express.Router();
const controller = require("../../controllers/contacts");
const {validateBody, isValidId} = require("../../middlewares/index");
const  { schemas }  = require("../../models/contact");



router.get('/', controller.getAll);

router.get('/:contactId', isValidId, controller.getById);

router.post('/', validateBody(
    schemas.addSchema), controller.addNewContact);

router.put('/:contactId',isValidId, validateBody(
    schemas.addSchema), controller.updateById);

router.patch('/:contactId/favorite',isValidId, validateBody(
    schemas.updateFavoriteSchema), controller.updateFavoriteById);

router.delete("/:contactId",isValidId, controller.deleteById);



module.exports = router;

