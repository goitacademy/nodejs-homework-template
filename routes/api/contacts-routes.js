const express = require("express");
const router = express.Router();

const contactsController = require('../../controllers/contacts-controller');

const schemas = require('../../schemas/contacts');

const {validateBody} = require('../../decorators/validateBody');

const isValidId = require("../../middlewares/isValidId");


router.get("/",contactsController.getAllContacts);

router.get("/:contactId",isValidId, contactsController.getContactById );

router.post("/", validateBody(schemas.contactAddSchema), contactsController.addContact);

router.delete("/:contactId", isValidId, contactsController.deleteContactById);

router.put("/:contactId",isValidId, validateBody(schemas.contactAddSchema), contactsController.updateContactById);

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.contactUpdateFavoriteSchema), contactsController.updateContactFavorite);


module.exports = router;
