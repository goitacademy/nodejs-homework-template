const express = require("express");

const {
  getAllContacts,
  getByIdContact,
  addContact,
  updateByIdContact,
  deleteByIdContact,
} = require("../../controllers/ctrlContacts");

const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");

const {
  addContactSchema,
  updateContactSchema,
} = require("../../schemas/contactsSchema");

const router = new express.Router();

router.get("/", ctrlWrapper(getAllContacts));
router.get("/:contactId", ctrlWrapper(getByIdContact));
router.post("/", validateBody(addContactSchema), ctrlWrapper(addContact));
router.put(
  "/:contactId",
  validateBody(addContactSchema),
  ctrlWrapper(updateByIdContact)
);
router.patch(
  "/:contactId",
  validateBody(updateContactSchema),
  ctrlWrapper(updateByIdContact)
);
router.delete("/:contactId", ctrlWrapper(deleteByIdContact));

module.exports = router;
