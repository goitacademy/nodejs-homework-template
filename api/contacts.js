const express = require("express");
const router = express.Router();
const task = require("../controllers/contacts");

router.get("/", task.getContacts);

router.get("/:id", task.getContact);

router.post("/", task.saveContact);

router.delete("/:id", task.removeContact);

router.put("/:id", task.updateContact);

router.patch("/:id/favorite/", task.updateStatusContact);

module.exports = router;
