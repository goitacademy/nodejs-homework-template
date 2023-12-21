import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import {isEmptyBody} from "../../middlewares/index.js";

const router = express.Router()

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", isEmptyBody, contactsController.add);

router.put("/:contactId", isEmptyBody, contactsController.updateById);

router.delete("/:contactId", contactsController.deleteById)

export default router;
