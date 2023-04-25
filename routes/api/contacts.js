const express = require("express");
const router = express.Router();

const {contacts: ctrl} = require("../../controllers");
const {joiSchema} = require("../../models/contact");
const {validation, ctrlWrapper} = require("../../middlewares");

// const validateMiddleware = validation(contactsSchema); 

router.get("/",  ctrlWrapper(ctrl.listContacts));

// router.get("/:contactId", ctrlWrapper(ctrl.getById));

// router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));

// router.put("/:contactId", validation(joiSchema), ctrlWrapper(ctrl.updateById));

// router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));

module.exports = router;
