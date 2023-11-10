import express from "express";
import ctrl from "../../controllers/contacts";
import { validateBody } from "../../middlewares";
import schemas from "../../schemas/contacts";

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:id", ctrl.removeContact);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContact);

export default router;
