const express = require("express");
const { tryCatchWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares/index");
const { addContactSchema } = require("../../schemas/contacts");
const router = express.Router();

// const models = require("../../models/contacts");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
} = require("../../controllers/contacts");

router.get("/", tryCatchWrapper(getContacts));
router.get("/:contactId", tryCatchWrapper(getContact));
router.post(
  "/",
  validateBody(addContactSchema),
  tryCatchWrapper(createContact)
);
router.delete("/:contactId", tryCatchWrapper(deleteContact));
router.put("/:contactId", tryCatchWrapper(changeContact));

module.exports = router;
