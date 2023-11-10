import express from "express";

import contactsController from "../../controllers/contacts-controllers.js";

import { isEmptyBody } from "../../middlewares/index.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getById);

router.post("/", isEmptyBody, contactsController.add);

router.put("/:id", isEmptyBody, contactsController.updateById);

router.delete("/:id", contactsController.deleteById);

export default router;
