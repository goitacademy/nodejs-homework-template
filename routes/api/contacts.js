const express = require("express");
const {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactById,
  updateStatusContact,
} = require("../../controllers/contacts/index.js");
const { auth } = require("../../middlewares/index.js");
const { isValidId } = require("../../middlewares/index.js");

const routerContacts = express.Router();

routerContacts.get("/", auth, getAllContacts);
routerContacts.get("/:id", auth, isValidId, getContact);
routerContacts.post("/", auth, createContact);
routerContacts.delete("/:id", auth, isValidId, deleteContact);
routerContacts.put("/:id", auth, isValidId, updateContactById);
routerContacts.patch("/:id/favorite", auth, isValidId, updateStatusContact);

module.exports = routerContacts;
