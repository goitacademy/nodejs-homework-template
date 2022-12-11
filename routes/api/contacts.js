const express = require("express");

const router = express.Router();

const contacts = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const { newContactSchema } = require("../../schemas");

router.get("/", contacts.getAll);

router.get("/:contactId", contacts.getById);

router.post("/", validateBody(newContactSchema), contacts.create);

router.delete("/:contactId", contacts.deleteById);

router.put("/:contactId", validateBody(newContactSchema), contacts.updateById);

module.exports = router;
