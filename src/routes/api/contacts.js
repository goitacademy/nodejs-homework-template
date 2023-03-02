const express = require("express");

const router = express.Router();

const {
  getConts,
  getContById,
  createContact,
  delContact,
  updateCont,
} = require("../../controllers/contactsControllers.js");

router.get("/contacts", getConts);

router.get("/contacts/:id", getContById);

router.post("/contacts", createContact);

router.delete("/contacts/:id", delContact);

router.put("/contacts/:id", updateCont);

module.exports = router;
