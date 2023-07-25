// ========ROUTES======== //
const express = require("express");
const router = express.Router();

const { checkContactId } = require("../middlewares/contactsMiddlewares");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../controllers/contactsControllers");

router.get("/", listContacts);
router.post("/", addContact);

router.use("/:contactId", checkContactId);

router.get("/:contactId", getContactById);
router.delete("/:contactId", removeContact);
router.put("/:contactId", updateContact);

module.exports = router;
