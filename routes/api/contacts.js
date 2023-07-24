const express = require("express");
const { addContact, contactList, getContactById, updateContact, updateStatusContact, removeContact } = require("../../controllers/index.js");
const router = express.Router();
const { validateBody, isValidId, authenticate } = require("../../middlewars/index.js");
const { schemas } = require("../../models/contact.js");

router.get("/", authenticate, contactList);

router.get("/:id", authenticate, isValidId, getContactById);

router.post("/", authenticate, validateBody(schemas.addSchema), addContact);

router.put("/:id", authenticate, isValidId, validateBody(schemas.addSchema), updateContact);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), updateStatusContact);

router.delete("/:id", authenticate, isValidId, removeContact);

module.exports = router;
