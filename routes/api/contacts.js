const express = require("express");

const router = express.Router();

const ctrs = require("../../controllers/contacts");

const validateBody = require("../../middllwares/validateBody");

const schema = require("../../schemas/contactSchema");

router.get("/", ctrs.getAll);

router.get("/:contactId", ctrs.getById);

router.post("/", validateBody(schema), ctrs.add);

router.delete("/:contactId", ctrs.remove);

router.put("/:contactId", validateBody(schema), ctrs.update);

module.exports = router;
