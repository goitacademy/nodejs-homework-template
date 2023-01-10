const express = require("express");

const contactsControls = require("../../controllers");
const router = express.Router();

const { ctrlWrapper, validation } = require("../../middlewares");
const {contactSchema, contactStatusSchema} = require("../../schemas")

router.get("/", ctrlWrapper(contactsControls.getAll));

router.get("/:contactId", ctrlWrapper(contactsControls.getById));

router.post("/", validation(contactSchema), ctrlWrapper(contactsControls.add));

router.delete("/:contactId", ctrlWrapper(contactsControls.removeById));

router.put("/:contactId",validation(contactSchema), ctrlWrapper(contactsControls.updateById));

router.patch("/:contactId/favorite", validation(contactStatusSchema), ctrlWrapper(contactsControls.updateStatusContact));

module.exports = router;
