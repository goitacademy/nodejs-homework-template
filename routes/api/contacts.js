const express = require("express");
const router = express.Router();
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  updateContactStatus,
  deleteContact,
} = require("../../controllers/contacts");
const { validate } = require("../../middlewares/validateBody");
const { schema, statusSchema } = require("../../models/contact");

router.get("/", ctrlWrapper(getAllContacts));
router.get("/:contactId", ctrlWrapper(getContactById));
router.post("/", validate(schema), ctrlWrapper(createContact));
router.put("/:contactId", validate(schema), ctrlWrapper(updateContact));
router.patch(
  "/:contactId/favorite",
  validate(statusSchema),
  ctrlWrapper(updateContactStatus)
);
router.delete("/:contactId", ctrlWrapper(deleteContact));

module.exports = router;
