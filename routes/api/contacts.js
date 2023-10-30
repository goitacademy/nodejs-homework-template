// routes\api\contacts.js
const express = require("express");
const controller = require("../../controllers/contacts");
const contactRouter = express.Router();

module.exports = () => {
  contactRouter.get("/", controller.listContacts);
  contactRouter.get("/:id", controller.getContactById);

  contactRouter.post("/", controller.addContact);

  contactRouter.put("/:id", controller.updateContact);

  contactRouter.delete("/:id", controller.removeContact);

  return contactRouter;
};
