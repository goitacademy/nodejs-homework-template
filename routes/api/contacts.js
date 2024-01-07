import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import {isEmptyBody, isValidId} from "../../middlewares/index.js";

const router = express.Router()

router.get("/", contactsController.getAll);

router.get("/:contactId", isValidId, contactsController.getById);

router.post("/", isEmptyBody, contactsController.add);

router.put("/:contactId", isValidId, isEmptyBody, contactsController.updateById);

router.delete("/:contactId", isValidId, contactsController.deleteById)

export default router;
