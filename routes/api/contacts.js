const express = require("express");
const router = express.Router();
const ctrlTask = require("../../controller/contacts.js");

router.get("/", ctrlTask.get);

router.get("/:contactId", ctrlTask.getById);

router.post("/", ctrlTask.create);

router.put("/:contactId", ctrlTask.update);

router.patch("/:contactId/favorite", ctrlTask.updateStatus);

router.delete("/:contactId", ctrlTask.remove);

module.exports = router;
