import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import {isEmptyBody} from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", contactsController.getById);

contactsRouter.post("/", isEmptyBody, contactsController.add);

contactsRouter.put("/:id", isEmptyBody, contactsController.updateById);

contactsRouter.delete("/:id", contactsController.deleteById);

export default contactsRouter;