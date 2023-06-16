const express = require("express");
const controllers = require('../../controllers/contactsCTRL')

const router = express.Router();
const validateBody = require('../../middlewares/validateBody')
const { addSchema } = require('../../models/contactModel')
const { updateFavoriteSchema } = require('../../models/contactModel')
const {isValidId} = require('../../middlewares/isValidId')


router.get("/", controllers.getAllContacts);

router.get("/:contactId", isValidId, controllers.getContactById);

router.post("/", validateBody(addSchema), controllers.addNewContact);

router.delete("/:contactId", isValidId, controllers.deleteContactById);

router.put("/:contactId", isValidId, validateBody(addSchema), controllers.updateContactById);

router.patch("/:contactId/favorite", isValidId, validateBody(updateFavoriteSchema), controllers.updateFavorite);

module.exports = router;
