const express = require("express");
const {
  validation,
  controllerWrapper: ctrlWrap,
} = require("../../middlewares");
const { contactsSchema } = require("../../schemas");
const { contactsController: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrap(ctrl.getAll));

router.get("/:contactId", ctrlWrap(ctrl.getById));

router.post("/", validation(contactsSchema), ctrlWrap(ctrl.add));

router.delete("/:contactId", ctrlWrap(ctrl.remove));

router.put("/:contactId", validation(contactsSchema), ctrlWrap(ctrl.update));

module.exports = router;
