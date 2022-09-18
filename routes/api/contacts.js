const express = require("express");
const {
  listContactsControls,
  getContactByIdControls,
  removeContactControls,
  addContactControls,
  updateContactControls,
  updateStatusContactControls,
} = require("../../Controls/Controls");
const {
  validation,
  validationPatch,
} = require("../../middleware/validationMiddleware");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = new express.Router();

router.get("/", asyncWrapper(listContactsControls));

router.get("/:contactId", asyncWrapper(getContactByIdControls));

router.post("/", validation, asyncWrapper(addContactControls));

router.delete("/:contactId", asyncWrapper(removeContactControls));

router.put("/:contactId", validation, asyncWrapper(updateContactControls));

router.patch(
  "/:contactId/favorite",
  validationPatch,
  updateStatusContactControls
);

module.exports = router;
