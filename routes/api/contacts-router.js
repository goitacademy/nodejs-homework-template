import express from "express";
import contactsControllers from "../../controllers/contacts-controller.js";
import { addSchema, updateSchema } from "../../schemas/contacts-schemas.js";
import { validateBody } from "../../decorators/index.js";

const router = express.Router();

router.get("/", contactsControllers.getAll);

router.get("/:contactId", contactsControllers.getById);

router.post("/", contactsControllers.add);

router.put("/:contactId", contactsControllers.updateById);

router.delete("/:contactId", contactsControllers.deleteById);

export default router;
