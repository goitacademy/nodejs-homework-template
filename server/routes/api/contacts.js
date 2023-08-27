import express from "express";
import ctrlContacts from "../controllers/contacts.js";

const router = express.Router();

router.get("/", ctrlContacts.get);

router.get("/:id", ctrlContacts.getById);

router.post("/", ctrlContacts.create);

router.delete("/:id", ctrlContacts.remove);

router.put("/:id", ctrlContacts.update);

router.patch("/:id/favorite", ctrlContacts.updateFavoriteStatus);

export default router;
