const express = require("express");
const {
  addContactValidation,
  putContactValidation,
} = require("../../middleware/validationMiddleware");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");

router.get("/", asyncWrapper(ctrl.getAll));

router.get("/:contactId", asyncWrapper(ctrl.getContactById));

router.post("/", addContactValidation, asyncWrapper(ctrl.addContact));

router.delete("/:contactId", asyncWrapper(ctrl.deleteContact));

router.put(
  "/:contactId",
  putContactValidation,
  asyncWrapper(ctrl.changeContact)
);

module.exports = router;
