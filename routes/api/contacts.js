import express from "express";
import ctrl from "../../controllers/contacts.js";

import schema from "../../schemas/contacts.js";
import validateBody from "../../middlewares/validateBody.js";

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(schema), ctrl.updateById);

export default router;
