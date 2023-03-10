import express from "express";
const router = express.Router();

import {
  ctrlGetAll,
  ctrlGetById,
  ctrlAdd,
  ctrlDeleteById,
  ctrlUpdateById,
} from "../../controllers/contacts.mjs";
import validateBody from "../../middlewares/validateBody.mjs";
import {addSchema} from "../../schemas/contacts.mjs";

router.get("/", ctrlGetAll);

router.get("/:contactId", ctrlGetById);

router.post("/", validateBody(addSchema), ctrlAdd);

router.delete("/:contactId", ctrlDeleteById);

router.put("/:contactId", validateBody(addSchema), ctrlUpdateById);

export default router;
