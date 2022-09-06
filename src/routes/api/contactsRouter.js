const express = require("express");
const {
  listContactsControlls,
  getContactByIdControlls,
  removeContactControlls,
  addContactControlls,
  updateContactControlls,
  updateStatusContactControlls,
} = require("../../controls/controlContacs");
const { authMiddleware } = require("../../middleware/authMiddeleware");
const { validation } = require("../../middleware/validationMiddleware");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = new express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper(listContactsControlls));

router.get("/:contactId", asyncWrapper(getContactByIdControlls));

router.post("/", validation, asyncWrapper(addContactControlls));

router.delete("/:contactId", asyncWrapper(removeContactControlls));

router.put("/:contactId", validation, asyncWrapper(updateContactControlls));

router.patch("/:contactId/favorite", validation, updateStatusContactControlls);

module.exports = router;
