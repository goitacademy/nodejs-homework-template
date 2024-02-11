const express = require("express");
const router = express.Router();





const {
  getContacts,
//   getContactById,
  addContact,
//   removeContact,
//   updateContact,
//   updateContactStatus,
} = require("../controller/index");

router.get("/Contacts", getContacts);

// router.get("/Contacts/:id", getContactById);

router.post("/Contacts", addContact);

// router.put("/Contacts/:id", updateContact);

// router.patch("/Contacts/:id/status", updateContactStatus);

// router.delete("/Contacts/:id", removeContact);

module.exports = router;
