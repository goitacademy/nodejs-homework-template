const express = require("express");
const router = express.Router();
const {
  getContacts,
  gatContact,
  createContact,
  deleteContact,
  changeContact,
  changeStatusContact,
} = require("../../controllers/contacts");

const { validateContact, validateId } = require("./validation");

router.get("/", getContacts);

router.get("/:contactId", validateId, gatContact);

router.post("/", validateContact, createContact);

router.delete("/:contactId", validateId, deleteContact);

router.put("/:contactId", [validateId, validateContact], changeContact);

router.patch(
  "/:contactId/favorite",
  [validateId, validateContact],
  changeStatusContact
);

module.exports = router;
