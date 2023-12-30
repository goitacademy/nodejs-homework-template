const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateContact } = require("../../middlewares");

const { contactValidationSchema } = require("../../schemas/contacts.js");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateContact(contactValidationSchema), ctrl.add);

router.delete("/:contactId", ctrl.deletebyId);

router.put("/:contactId", validateContact(contactValidationSchema), ctrl.updateById);

module.exports = router;