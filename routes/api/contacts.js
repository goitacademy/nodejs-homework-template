const express = require("express");
const { addContact, contactList, getContactById, updateContact, updateStatusContact, removeContact } = require("../../controllers/index.js");
const router = express.Router();
const { validateBody, isValidId } = require("../../middlewars/index.js");
const { schemas } = require("../../models/index.js");

router.get("/", contactList);

router.get("/:id", isValidId, getContactById);

router.post("/", validateBody(schemas.addSchema), addContact);

router.put("/:id", isValidId, validateBody(schemas.addSchema), updateContact);

router.patch("/:id/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), updateStatusContact);

router.delete("/:id", isValidId, removeContact);

module.exports = router;
