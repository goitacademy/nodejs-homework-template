const express = require("express");

const { contactsController: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlerwares");
const { contactsSchema } = require("../../schemas");
const { errMsg2, errMsg1 } = require("../../messages/messagesError");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(contactsSchema, errMsg2), ctrlWrapper(ctrl.addNew));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));

router.put(
  "/:contactId",
  validation(contactsSchema, errMsg1),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
