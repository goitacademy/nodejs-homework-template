const express = require("express");
const controllers = require('../../../controllers/contacts')

const router = express.Router();
const {validateBody} = require('../../../middlewares')
const { contactSchemaJoi } = require('../../../models/contact')
const { updateFavoriteSchema } = require('../../../models/contact')
const { isValidId } = require('../../../middlewares')
const { authenticate } = require('../../../middlewares')

router.get("/", authenticate, controllers.getAllContacts);

router.get("/:contactId", authenticate, isValidId, controllers.getContactById);

router.post("/", authenticate, validateBody(contactSchemaJoi), controllers.addNewContact);

router.delete("/:contactId", authenticate, isValidId, controllers.deleteContactById);

router.put("/:contactId", authenticate, isValidId, validateBody(contactSchemaJoi), controllers.updateContactById);

router.patch("/:contactId/favorite", authenticate, isValidId, validateBody(updateFavoriteSchema), controllers.updateFavorite);

module.exports = router;
