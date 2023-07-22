const express = require("express");
const router = express.Router();
const { validateBody, isValidId, dontBody } = require("../../middlewares");
const { schemas } = require("../../schemas");
const { functions } = require("../../controlers");
const {
  getContacts,
  getContactsById,
  addContact,
  deleteContact,
  updateContactById,
  updateStatusById,
} = functions;
router.get("/", getContacts);

router.get("/:id", isValidId, getContactsById);

router.post("/", dontBody, validateBody(schemas.contactSchema), addContact);

router.delete("/:id", isValidId, deleteContact);

router.put(
  "/:id",
  isValidId,
  dontBody,
  validateBody(schemas.contactPutSchema),
  updateContactById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.favoriteSchema),
  updateStatusById
);

module.exports = router;
