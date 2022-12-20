const express = require("express");

const contactsControls = require("../../controllers");
const router = express.Router();

const {ctrlWrapper} = require("../../middlewares")

router.get("/", ctrlWrapper(contactsControls.getAll));

router.get("/:contactId", ctrlWrapper(contactsControls.getById));

router.post("/", ctrlWrapper(contactsControls.add));

router.delete("/:contactId", ctrlWrapper(contactsControls.removeById));

router.put("/:contactId", ctrlWrapper(contactsControls.updateById));

module.exports = router;
