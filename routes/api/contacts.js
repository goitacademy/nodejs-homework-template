const express = require('express')

const {validationBody, isValidId} = require("../../middlewares");
const {schemas} = require("../../models/contact");
const {ctrlWrapper} = require("../../helpers");
const {getAll,
getById,
add,
updateById,
updateStatusContact,
removeById
} = require("../../controllers/contacts");

const router = express.Router();


router.get('/', ctrlWrapper(getAll)); 

router.get('/:contactId', isValidId, ctrlWrapper(getById));

router.post('/', validationBody(schemas.contactAddSchema), ctrlWrapper(add));

router.patch("/:contactId/favorite", isValidId, validationBody(schemas.updateFavoriteSchema), ctrlWrapper(updateStatusContact));

router.delete('/:contactId', isValidId, ctrlWrapper(removeById));

router.put('/:contactId', isValidId, validationBody(schemas.contactAddSchema), ctrlWrapper(updateById));  

module.exports = router;
