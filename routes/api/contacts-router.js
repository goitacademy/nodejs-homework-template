const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", contactsController.deleteById);

contactsRouter.post("/", contactsController.add);

contactsRouter.delete("/:id", contactsController.deleteById);

contactsRouter.put("/:id", contactsController.updateById);

module.exports = contactsRouter;
