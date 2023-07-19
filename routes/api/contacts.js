import express from "express";

import {
	getAllCobtactsCtrl,
	findContactByIdCtrl,
	addContactCtrl,
	putContactDataCtrl,
	deleteContactByIdCtrl,
} from "../../controlers/movie-controler.js";

const router = express.Router();

router.get("/", getAllCobtactsCtrl);

router.get("/:contactId", findContactByIdCtrl);

router.post("/", addContactCtrl);

router.put("/:contactId", putContactDataCtrl);

router.delete("/:contactId", deleteContactByIdCtrl);

export default router;
