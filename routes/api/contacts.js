const express = require("express");

const {
  getContacts,
  getById,
  createContact,
  deleteContact,
  changeContact,
  updateStatus,
} = require("../../controllers/contactsController");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const validationData = require("../../middlewares/contactValidation");
const {
  contactSchemaJoi,
  updateStatusJoiSchema,
} = require("../../schemas/contactSchema");

const router = express.Router();

router.get("/", ctrlWrapper(getContacts));

router.get("/:id", ctrlWrapper(getById));

router.post("/", validationData(contactSchemaJoi), ctrlWrapper(createContact));

router.delete("/:id", ctrlWrapper(deleteContact));

router.put(
  "/:id",
  validationData(contactSchemaJoi),
  ctrlWrapper(changeContact)
);

router.patch(
  "/:id/favorite",
  validationData(updateStatusJoiSchema),
  ctrlWrapper(updateStatus)
);

module.exports = router;
