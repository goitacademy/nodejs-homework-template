import express from "express";

import validateBody from "../../decorators/validateBody.js";
import userAddSchema from "../../schemas/schemas.js";

import ctrl from "../../controlers/movie-ctrl.js";

const router = express.Router();

router.get("/", ctrl.getAllContactsCtrl);

router.get("/:contactId", ctrl.findContactByIdCtrl);

router.post("/", validateBody(userAddSchema), ctrl.addContactCtrl);

router.put("/:contactId", validateBody(userAddSchema), ctrl.putContactDataCtrl);

router.delete("/:contactId", ctrl.deleteContactByIdCtrl);

export default router;
