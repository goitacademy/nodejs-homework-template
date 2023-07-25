const express = require("express");

const contacts = require("../../controllers/contacts");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, contacts.getAll);

router.get("/:id", authenticate, contacts.getById);

router.post("/", authenticate, contacts.add);

router.delete("/:id", authenticate, contacts.deleteById);

router.put("/:id", authenticate, contacts.updateById);

router.patch("/:id/favorite", authenticate, contacts.updateStatus);

module.exports = router;
