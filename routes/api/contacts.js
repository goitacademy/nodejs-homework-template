import express from "express";

import validateBody from "../../decorators/validateBody.js";
import userAddSchema from "../../schemas/schemas.js";

import { getAllCobtactsCtrl, findContactByIdCtrl, addContactCtrl, putContactDataCtrl, deleteContactByIdCtrl } from "../../controlers/movie-ctrl.js";

const router = express.Router();

router.get("/", getAllCobtactsCtrl);

router.get("/:contactId", findContactByIdCtrl);

router.post("/", validateBody(userAddSchema), addContactCtrl);

router.put("/:contactId", validateBody(userAddSchema), putContactDataCtrl);

router.delete("/:contactId", deleteContactByIdCtrl);

export default router;
