import express from "express";
import auth from "../../middlewares/auth.js"
import contactsController from "../../controllers/contacts.controller.js";

const router = express.Router();

router.get("/contacts",auth, contactsController.get);

router.get("/contacts/:id", auth, contactsController.getById);

router.post("/contacts", auth,contactsController.create);

router.put("/contacts/:id", auth, contactsController.update);

router.patch("/contacts/:id/favorite", auth, contactsController.updateFavorite);

router.delete("/contacts/:id",auth,  contactsController.remove);

export { router };
