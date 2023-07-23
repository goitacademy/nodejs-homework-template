const express = require("express");
const contactsRouter = express.Router();

const ctrl = require("../../controllers/contacts/contacts-controllers")
const { validation } = require("../../middlewares");
const { contactsSchema } = require("../../schemas")

const validateMiddleWare = validation(contactsSchema)

contactsRouter.get("/", ctrl.getAll);

contactsRouter.post("/", validateMiddleWare, ctrl.add);

// contactsRouter.get("/:id", ctrl.getById);


// contactsRouter.put("/:id", validateMiddleWare, ctrl.updById);

// contactsRouter.delete("/:id", ctrl.deleteById);


module.exports = contactsRouter;
