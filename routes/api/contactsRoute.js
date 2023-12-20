import express from "express";
import * as contactService from "../../models/contactsModel.js";
import contactsController from "../../controllers/contacts-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAllContacts);
contactsRouter.get("/:contactId", contactsController.getContactById);
contactsRouter.post("/", isEmptyBody, contactsController.addContacts);

contactsRouter.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

export default contactsRouter;
