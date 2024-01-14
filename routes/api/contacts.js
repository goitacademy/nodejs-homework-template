const express = require("express");
const validateBody = require("../../middlewares/validateBody.js");

const {
  contactAddSchema,
  contactUpdateSchema,
} = require("../../schemas/contacts.js");

const {
  getById,
  getAll,
  addContactById,
  deleteContactById,
  updateContactById,
} = require("../../controller/contacts.js");
const validateIsBodyEmpty = require("../../middlewares/validateIsBodyEmpty.js");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(contactAddSchema), addContactById);

router.delete("/:contactId", deleteContactById);

router.put(
  "/:contactId",
  validateIsBodyEmpty,
  validateBody(contactUpdateSchema),
  updateContactById
);

module.exports = router;
