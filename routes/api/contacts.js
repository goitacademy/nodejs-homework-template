const express = require("express");

const {
  getContacts,
  // getContactById,
  // addNewContact,
  // deleteContact,
  // putContact,
} = require("../../controllers/controllers");

const router = express.Router();

router.get("/", getContacts);

// router.get("/:contactId", getContactById);

// router.post("/", addNewContact);

// router.delete("/:contactId", deleteContact);

// router.put("/:contactId", putContact);

module.exports = router;
