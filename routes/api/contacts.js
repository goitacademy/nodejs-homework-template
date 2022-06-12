const express = require("express");
const { ctrlWrapper, validation } = require("../../middleware");
const { joiSchema, statusSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(joiSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put("/:contactId",validateMiddleware, ctrlWrapper(ctrl.updateById));

router.patch("/:contactId/favorite", validation(statusSchema), ctrlWrapper(ctrl.updateById));

module.exports = router;
