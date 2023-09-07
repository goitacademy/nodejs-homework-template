import express from "express";

const router = express.Router();

import ctrl from "../../controllers/contact.js";

import addSchema from "../../schemas/contact.js";

import validateBody from "../../middlewares/validateBody.js";

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(addSchema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(addSchema), ctrl.updateById);

export default router;
