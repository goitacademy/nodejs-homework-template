const express = require("express");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { contactSchema, updateFavoriteSchema } = require("../../schemas");

const {
  contacts: {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
  },
} = require("../../controllers");

const router = express.Router();

router.get("/", authenticate, listContacts);

router.get("/:id", authenticate, isValidId, getContactById);

router.post("/", authenticate, validateBody(contactSchema), addContact);

router.delete("/:id", authenticate, isValidId, removeContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(contactSchema),
  updateContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
