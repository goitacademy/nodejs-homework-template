const express = require("express");

const contacts = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

contacts.get("/", ctrlWrapper(ctrl.getAll));

contacts.get("/:contactId", ctrlWrapper(ctrl.getById));

contacts.post("/", ctrlWrapper(ctrl.add));

contacts.delete("/:contactId", ctrlWrapper(ctrl.removeById));

contacts.put("/:contactId", ctrlWrapper(ctrl.updateById));

module.exports = contacts;
