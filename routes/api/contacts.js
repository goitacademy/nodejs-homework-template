/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const addSchema = require("../../schemas");

const validateMiddleware = validation(addSchema);

// router.get("/", ctrlWrapper(ctrl.listContacts));

// router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", ctrlWrapper(ctrl.addContact));

// router.put("/:id", validateMiddleware, ctrlWrapper(ctrl.updateContact));

// router.delete("/:id", ctrlWrapper(ctrl.removeContact));

module.exports = router;
