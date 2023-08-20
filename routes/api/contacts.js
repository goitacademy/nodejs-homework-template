import express from "express";
import constactsController from "../../controllers/index.js";
import { validateData, checkBody } from "../../helpers/index.js";

const router = express.Router();


router.get("/", constactsController.getContacts);
router.get("/:contactId", constactsController.getContact);
router.post("/", validateData, constactsController.addContact);
router.delete("/:contactId", constactsController.deleteContact);
router.put(
    "/:contactId",
    checkBody,
    validateData,
    constactsController.updateContact
);

export default router;
