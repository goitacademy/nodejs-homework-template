import express from "express";
import contactsController from "../../controllers/contacts-controller.js"
import isEmptyBody from "../../middlewares/isEmptyBody.js";


export const router = express.Router();


router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", isEmptyBody, contactsController.add);

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

