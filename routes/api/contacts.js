import express from "express";
import ctrl from "../../controllers/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAll);

contactsRouter.get("/:id", ctrl.getById);

contactsRouter.post("/", ctrl.add);

contactsRouter.delete("/:id", ctrl.deleteById);

contactsRouter.put("/:id", ctrl.updateById);

export default contactsRouter;
