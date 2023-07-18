const express = require("express");
const router = express.Router();

const contacts = require("../../controllers/contacts");

router.get("/", contacts.getAll);

router.get("/:id", contacts.getById);

router.post("/", contacts.add);

router.delete("/:id", contacts.deleteById);

router.put("/:id", contacts.updateById);

router.patch("/:id/favorite", contacts.updateStatus);

module.exports = router;
