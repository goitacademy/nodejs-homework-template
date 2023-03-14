const express = require("express");

const router = express.Router();

const {
  getContactsListCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactCtrl,
  updateStatusContactCtrl,
} = require("../../controllers/contacts");

const { asyncWrapper } = require("../../helpers");

router.get("/", asyncWrapper(getContactsListCtrl));

router.get("/:contactId", asyncWrapper(getContactByIdCtrl));

router.post("/", asyncWrapper(addContactCtrl));

router.delete("/:contactId", asyncWrapper(removeContactCtrl));

router.put("/:contactId", asyncWrapper(updateContactCtrl));

router.patch("/:contactId", asyncWrapper(updateStatusContactCtrl));

router.patch("/:contactId/favorite", asyncWrapper(updateStatusContactCtrl));

module.exports = router;
