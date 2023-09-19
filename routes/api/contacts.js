const express = require("express");
// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../../models/contacts");

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { contacts: cntr } = require("../../controlers");

const validateMiddleware = validation(contactSchema)

const router = express.Router();

router.get("/", ctrlWrapper(cntr.getAll));

router.get("/:contactId", ctrlWrapper(cntr.getById));

router.post("/", validateMiddleware, ctrlWrapper(cntr.add));

router.delete("/:contactId", ctrlWrapper(cntr.removeById));

router.put("/:contactId", validation(contactSchema), ctrlWrapper(cntr.updateById));

module.exports = router;
