const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
} = require("../../controller/controller");

const router = express.Router();
require('dotenv').config()

router.get("/", listContacts);
router.get("/:contactId",getContactById)
router.post("/",addContact)
router.delete("/:contactId",removeContact)
router.put("/:contactId",updateContact)
router.patch("/:contactId/favorite",updateStatusContact)


module.exports = router;
