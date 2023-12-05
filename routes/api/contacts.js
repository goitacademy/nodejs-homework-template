const express = require('express');


const router = express.Router();
const {
    getAll, 
    getById, 
    addNewContact, 
    updateById, 
    updateFavoriteById, 
    deleteById
} = require("../../controllers/contacts/index");
const {validateBody, isValidId, authenticate} = require("../../middlewares/index");
const  { schemas }  = require("../../models/contact");


router.get('/', authenticate, getAll.getAll);

router.get('/:contactId', authenticate, isValidId, getById.getById);

router.post('/',authenticate, validateBody(
    schemas.addSchema), addNewContact.addNewContact);

router.put('/:contactId',authenticate, isValidId, validateBody(
    schemas.addSchema), updateById.updateById);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(
    schemas.updateFavoriteSchema), updateFavoriteById.updateFavoriteById);

router.delete("/:contactId",authenticate, isValidId, deleteById.deleteById);



module.exports = router;

