const express = require("express");
const {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  updateFavoriteById,
  deleteContactById,
} = require("../../controllers/contacts.controllers");

const { schemas } = require("../../models/contact");
const { validateBody } = require("../../utils");
const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", validateBody(schemas.addSchema), addContact);

router.delete("/:contactId", deleteContactById);

router.put("/:contactId", validateBody(schemas.addSchema), updateContactById);
router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  updateFavoriteById
);

module.exports = router;
