import express from "express";
import contactsControllers from "../../controllers/contacts-controller.js";

const router = express.Router();

router.get("/", contactsControllers.getAll);

router.get("/:contactId", contactsControllers.getById);

router.post("/", contactsControllers.add);

router.put("/:contactId", contactsControllers.updateById);

router.delete("/:contactId", contactsControllers.deleteById);

export default router;
