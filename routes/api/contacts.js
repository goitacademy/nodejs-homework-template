import express from "express";

import ctrl from "../../controllers/contacts-controller.js";

import validateBody from "../../middlewares/validateBody.js";

import * as schemas from "../../schemas/contacts.js";

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateByid);

router.delete("/:contactId", ctrl.deleteById);

export default router;
