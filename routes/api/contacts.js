import express from "express";

import validateBody from "../../decorators/validateBody.js";
import isValidID from "../../decorators/isValidID.js";

import { userAddSchema, contactFavoriteUpdateSchema } from "../../schemas/schemas.js";

import ctrl from "../../controlers/movie-ctrl.js";

const router = express.Router();

router.get("/", ctrl.getAllContactsCtrl);

router.post("/", validateBody(userAddSchema), ctrl.addContactCtrl);

router.get("/:contactId", isValidID, ctrl.findContactByIdCtrl);

router.put("/:contactId", isValidID, validateBody(userAddSchema), ctrl.updateByIdCtrl);

router.patch("/:contactId/favorite", isValidID, validateBody(contactFavoriteUpdateSchema), ctrl.updateByIdCtrl);

router.delete("/:contactId", isValidID, ctrl.deleteContactByIdCtrl);

export default router;
