import express from "express";
import auth from "../middlewares/authorization.js";
import contactsController from "../controllers/contacts.js";

const router = express.Router();

router.get("/", auth, contactsController.get);

router.get("/:id", auth, contactsController.getById);

router.post("/", auth, contactsController.create);

router.delete("/:id", auth, contactsController.remove);

router.put("/:id", auth, contactsController.update);

router.patch("/:id/favorite", auth, contactsController.updateFavorite);

export default router;
