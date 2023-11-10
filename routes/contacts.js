// import express from "express";
// import * as contacts from "#controllers/contacts";
// export const routerContacts = express.Router();

// routerContacts.get("/contacts", contacts.getAllContacts);
// routerContacts.get("/contacts/:id", contacts.getContact);
// routerContacts.post("/contacts", contacts.createContact);
// routerContacts.put("/contacts/:id", contacts.putContact);
// routerContacts.patch("/contacts/:id/favorite", contacts.updateFavorite);
// routerContacts.delete("/contacts/:id", contacts.deleteContact);

import express from "express";
import {
  getAllContacts,
  getContact,
  createContact,
  putContact,
  updateFavorite,
  deleteContact,
} from "#controllers/contacts/index.js";
export const routerContacts = express.Router();

routerContacts.get("/contacts", getAllContacts);
routerContacts.get("/contacts/:id", getContact);
routerContacts.post("/contacts", createContact);
routerContacts.put("/contacts/:id", putContact);
routerContacts.patch("/contacts/:id/favorite", updateFavorite);
routerContacts.delete("/contacts/:id", deleteContact);
