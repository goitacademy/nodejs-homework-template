import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

// import {isEmptyBody} from "../../middlewares/index.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", contactsController.addNew);

router.delete("/:contactId", contactsController.removeById);

router.put("/:contactId", contactsController.updateById);

export default router;
