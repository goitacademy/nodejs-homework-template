import express from "express";
import contactsController from "../../controllers/mivies-controllers.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", contactsController.add);

router.delete("/:contactId", contactsController.delleteById);

router.put("/:contactId", contactsController.updateById);

export default router;
