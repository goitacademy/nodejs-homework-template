const express = require("express");
const {
  getAllContacts,
  getSingleContact,
  deleteContact,
  postContact,
  patchContact,
} = require("../../controller");
const {
  addContactValidation,
  updateContactValidation,
  checkFieldInContact,
  checkIdInContact,
} = require("../../middlewares");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", checkIdInContact, getSingleContact);

router.delete("/:contactId", checkIdInContact, deleteContact);

router.post("/", [addContactValidation, checkFieldInContact], postContact);

router.patch(
  "/:contactId",
  [updateContactValidation, checkIdInContact],
  patchContact
);

module.exports = router;
