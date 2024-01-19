import express from "express";
import contactsController from "../../controllers/contacts.controller.js";

const router = express.Router();

router.get("/contacts", contactsController.get);

router.get("/contacts/:id", contactsController.getById);

router.post("/contacts", contactsController.create);

router.put("/contacts/:id", contactsController.update);

router.patch("/contacts/:id/favorite", contactsController.updateFavorite);

router.delete("/contacts/:id", contactsController.remove);

export { router };
