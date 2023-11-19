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
