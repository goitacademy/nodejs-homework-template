import express from "express";

import validateBody from "../../decorators/validateBody.js";

import { getAllCobtactsCtrl, findContactByIdCtrl, addContactCtrl, putContactDataCtrl, deleteContactByIdCtrl } from "../../controlers/movie-ctrl.js";

const router = express.Router();

router.get("/", getAllCobtactsCtrl);

router.get("/:contactId", findContactByIdCtrl);

router.post("/", addContactCtrl);

router.put("/:contactId", putContactDataCtrl);

router.delete("/:contactId", deleteContactByIdCtrl);

export default router;
