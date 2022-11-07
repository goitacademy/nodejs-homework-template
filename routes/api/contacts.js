const express = require("express");

const router = express.Router();

const contactControllers = require("../../controllers/contactsControllers");
const isValidId = require("../../middlewares/isValidId");

router.get("/", contactControllers.listContacts);

router.get("/:contactId", isValidId, contactControllers.getContactById);

router.post("/", contactControllers.addContact);

router.delete("/:contactId", isValidId, contactControllers.removeContact);

router.put("/:contactId", isValidId, contactControllers.updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  contactControllers.updateFavorite
);

module.exports = router;
