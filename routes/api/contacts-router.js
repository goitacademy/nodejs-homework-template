import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody, isValidateBodyPost, isValidateBodyPut } from "../../middlewares/index.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", isEmptyBody, isValidateBodyPost, contactsController.addNew);

router.delete("/:contactId", contactsController.removeById);

router.put("/:contactId", isEmptyBody, isValidateBodyPut, contactsController.updateById);

export default router;
