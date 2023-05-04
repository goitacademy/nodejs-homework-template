const express = require("express");

const router = express.Router();

const ctrs = require("../../controllers/contacts");

router.get("/", ctrs.getAll);

router.get("/:contactId", ctrs.getById);

router.post("/", ctrs.add);

router.delete("/:contactId", ctrs.remove);

router.put("/:contactId", ctrs.update);

module.exports = router;
