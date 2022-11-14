const express = require("express");
const router = express.Router();
const ctrlContact = require("../controller");

router.get("/", ctrlContact.get);

router.get("/:id", ctrlContact.getById);

router.post("/", ctrlContact.create);

router.delete("/:id", ctrlContact.remove);

router.put("/:id", ctrlContact.update);

router.patch("/:id/status", ctrlContact.updateStatusContact);

module.exports = router;
