import express from "express";
import auth from "../../middleware/auth.js";
import pagination from "../../middleware/pagination.js";
import contactsController from "../../controllers/contacts.js";

const router = express.Router();

router.get("/", auth, pagination(), contactsController.getAll);

router.get("/:id", auth, contactsController.getById);

router.post("/", auth, contactsController.create);

router.patch("/:id", auth, contactsController.update);

router.patch("/:id/favorite", auth, contactsController.updateFavorite);

router.delete("/:id", auth, contactsController.remove);

export default router;
