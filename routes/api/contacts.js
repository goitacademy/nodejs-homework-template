import express from "express";
const router = express.Router();

import {
  ctrlGetAll,
  ctrlGetById,
  ctrlAdd,
  ctrlDeleteById,
  ctrlUpdateById,
} from "../../controllers/contacts.js";
import validateBody from "../../middlewares/validateBody.js";
import {addSchema} from "../../schemas/contacts.js";

router.get("/", ctrlGetAll);

router.get("/:contactId", ctrlGetById);

router.post("/", validateBody(addSchema), ctrlAdd);

router.delete("/:contactId", ctrlDeleteById);

router.put("/:contactId", validateBody(addSchema), ctrlUpdateById);

export default router;
