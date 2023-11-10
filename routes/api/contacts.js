import express from "express";
import contactsController from "../../controllers/contactControler";

const router = express.Router();

router.get("/", contactsController.getList);

router.get("/:id", contactsController.getContactId);

router.post("/", contactsController.postAddContact);

router.delete("/:id", contactsController.deleteContact);

router.put("/:id", contactsController.updateContact);

export default router;
