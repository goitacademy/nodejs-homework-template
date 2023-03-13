const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const {
  checkUserAddData,
  checkUserPutData,
} = require("../../middlewares/userMIddlewares");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", checkUserAddData, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", checkUserPutData, updateContact);

module.exports = router;
