const express = require("express");
const router = express.Router();
const ctrlContact = require("../../controller/index");

router.get("/", ctrlContact.get);

router.get("/:id", ctrlContact.getById);

router.post("/", ctrlContact.create);

router.put("/:id", ctrlContact.update);

router.patch("/:id/favorite", ctrlContact.updateStatus);

router.delete("/:id", ctrlContact.remove);

module.exports = router;
