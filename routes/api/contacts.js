const express = require("express");

const {
  getAll,
  getById,
  add,
  remove,
  update,
  updateStatusContact,
} = require("../../controllers/contacts");

const {
  validateBody,
  checkValidId,
  authenticate,
} = require("../../middlewares");

const {
  contactsScheme,
  updateStatusSchema,
} = require("../../schemas/contactsScheme.js");

const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, checkValidId, getById);

router.post("/", authenticate, validateBody(contactsScheme), add);

router.delete("/:contactId", authenticate, checkValidId, remove);

router.put(
  "/:contactId",
  authenticate,
  checkValidId,
  validateBody(contactsScheme),
  update
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  checkValidId,
  validateBody(updateStatusSchema),
  updateStatusContact
);

module.exports = router;
