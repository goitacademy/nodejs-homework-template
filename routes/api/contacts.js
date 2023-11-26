const express = require("express");

const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { validation } = require("../../middlewares");
const { contactSchema } = require("../../schema");

const validateMiddleware = validation(contactSchema);

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateMiddleware, ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validateMiddleware, ctrl.changeById);

module.exports = router;
