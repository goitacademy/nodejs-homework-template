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

const guard = require("../../helpers/guard");

router.get("/", guard, getContacts);

router.get("/:contactId", guard, validateId, gatContact);

router.post("/", guard, validateContact, createContact);

router.delete("/:contactId", guard, validateId, deleteContact);

router.put("/:contactId", guard, [validateId, validateContact], changeContact);

router.patch(
  "/:contactId/favorite",
  guard,
  [validateId, validateContact],
  changeStatusContact
);

module.exports = router;
