import express from "express";
const router = express.Router();
import{ctrlAdd, ctrlDeleteById, ctrlGetAll, ctrlGetById, ctrlUpdateById, ctrlUpdateFavorite} from '../../controllers/contacts.js'

import { validateAdd, validateUpdateFavorite } from "../../schemas/contacts.js";

import { validateId } from "../../middlewares/validateId.js";
import { validateBody } from "../../middlewares/validateBody.js";
router.get("/", ctrlGetAll);

router.get("/:contactId", validateId, ctrlGetById);

router.post("/", validateBody(validateAdd), ctrlAdd);

router.delete("/:contactId", ctrlDeleteById);

router.put("/:contactId", validateBody(validateAdd), ctrlUpdateById);

router.patch(
  "/:contactId/favorite",
  validateBody(validateUpdateFavorite),
  ctrlUpdateFavorite
);

export default router;
