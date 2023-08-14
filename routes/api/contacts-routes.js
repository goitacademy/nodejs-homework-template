const express = require("express");

const { getAllContacts } = require("../../controllers/contacts");
const { getContactById } = require("../../controllers/contacts");
const { addContact } = require("../../controllers/contacts");
const { updateContactById } = require("../../controllers/contacts");
const { updateStatusContact } = require("../../controllers/contacts");
const { deleteContact } = require("../../controllers/contacts");

const schemas = require("../../schemas/contacts");

const { validateBody } = require("../../decorators");

const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.use(authenticate);

router.get("/", getAllContacts);

router.get("/:id", isValidId, getContactById);

router.post("/", validateBody(schemas.contactAddSchema), addContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.contactAddSchema),
  updateContactById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.contactUpdateFavoriteSchema),
  updateStatusContact
);

router.delete("/:id", isValidId, deleteContact);

module.exports = router;
