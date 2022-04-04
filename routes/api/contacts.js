const express = require("express");

const {
  getContacts,
  getContactsById,
  addContacts,
  deleteContacts,
  patchContact,
  patchFavorite,
} = require("../../controllers/contacts");

const { validation } = require("../../middlewares/");
const {
  joiScemaCreateContact,
  joiScemaUpdateContact,
} = require("../../models/contact");

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", getContactsById);
router.post("/", validation(joiScemaCreateContact), addContacts);
router.delete("/:contactId", deleteContacts);
router.put("/:contactId", validation(joiScemaUpdateContact), patchContact);
router.patch("/:contactId/favorite", patchFavorite);

module.exports = router;
