const express = require("express");

const {
  getContacts,
  getById,
  createContact,
  deleteContact,
  changeContact,
} = require("../../controllers/contactsController");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const validationData = require("../../middlewares/contactValidation");
const { contactSchema } = require("../../schemas/contactSchema");

const router = express.Router();

router.get("/", ctrlWrapper(getContacts));

router.get("/:id", ctrlWrapper(getById));

router.post("/", validationData(contactSchema), ctrlWrapper(createContact));

router.delete("/:id", ctrlWrapper(deleteContact));

router.put("/:id", validationData(contactSchema), ctrlWrapper(changeContact));

module.exports = router;
