/** @format */

// const express = require('express')
import express from "express";

// import {listContacts} from "../../models/contacts.js";
// import contacts from "../../models/contacts.json";

import contactsService from "../../models/contacts.js";
import contactsController from "../../controllers/contacts-controller.js";
import {isEmptyBody} from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:contactId", contactsController.contactById);

contactsRouter.post("/", isEmptyBody, contactsController.addContact);

contactsRouter.delete("/:contactId", contactsController.removeContact);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  contactsController.updateContact
);
// async (req,res,next) => {
// const result = await contactsService.removeContact(contactId, body);
//   res.json(result);
// res.json({message: "template message"});}
// );

// module.exports = router
export default contactsRouter;
