const express = require("express");
const {
  addContactValidation,
  changeContactValidation,
} = require("../../middlewares/validationMiddleWare");

const {
  getContactsList,
  contactById,
  addNewContact,
  deleteContact,
  contactUpdate,
  changeContact,
} = require("../../controllers/postControllerl");

const router = express.Router();

router.get("/", getContactsList);

router.get("/:contactId", contactById);

router.post("/", addContactValidation, addNewContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", addContactValidation, contactUpdate);

router.patch("/:contactId", changeContactValidation, changeContact);

module.exports = router;
