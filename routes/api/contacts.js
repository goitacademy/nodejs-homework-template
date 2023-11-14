import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import isEmptyBody from "../../middlewars/isEmptyBody.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getByID);

router.post("/", isEmptyBody, contactsController.add);

router.delete("/:contactId", contactsController.deleteByID);

router.put("/:contactId", isEmptyBody, contactsController.update);

export default router;
