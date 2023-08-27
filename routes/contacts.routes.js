const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contacts.controller");
const { get, getOne, create, update, updateStatus, remove } = contactController;

router.get("/", get);

router.get("/:contactId", getOne);

router.post("/", create);

router.put("/:contactId", update);

router.patch("/:contactId/favorite", updateStatus);

router.delete("/:contactId", remove);

module.exports = router;
