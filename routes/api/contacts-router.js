import express from "express";

import contactsController from "../../controller/contactController.js";

import isValidId from "../../middlewars/isValidId.js";


const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll );

contactsRouter.get("/:id", isValidId,  contactsController.getById);

contactsRouter.post("/", contactsController.add);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

contactsRouter.put("/:id", isValidId, contactsController.updateById);

contactsRouter.patch("/:id/favorite", isValidId, contactsController.updateStatusContact);

export default contactsRouter;
