const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getListContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(contactSchema), ctrlWrapper(ctrl.postAddContact));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContactById));

router.put(
  "/:contactId",
  validation(contactSchema),
  ctrlWrapper(ctrl.putUpdateById)
);

module.exports = router;
