const express = require("express");
const contact = require("../../controllers/contacts");

const router = express.Router();

router.get("/", contact.list);

router.get("/:contactId", contact.getById);

router.post("/", contact.add);

router.put("/:contactId", contact.update);

router.delete("/:contactId", contact.remove);

module.exports = router;
