const express = require("express");
const validateBody = require("../../middlewars/validateBody");
const {
  contactsSchema,
  updateFavoriteSchema,
} = require("../../schemas/contactsSchema");
const router = express.Router();
const authenticate = require("../../middlewars/authenticate");
const isValidId = require("../../middlewars/isValidId");

const contactController = require("../../controllers/contacts");

router.use(authenticate);

router.get("/", contactController.listContacts);

router.get("/:id", isValidId, contactController.getContactById);

router.post("/", validateBody(contactsSchema), contactController.addContact);

router.delete("/:id", isValidId, contactController.removeContact);

router.put(
  "/:id",
  isValidId,
  validateBody(contactsSchema),
  contactController.updateContactById
);

router.patch(
  "/:id/favourite",
  validateBody(updateFavoriteSchema),
  isValidId,
  contactController.updateFavourite
);

module.exports = router;
