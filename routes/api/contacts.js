import express from "express";
import ctrl from "../../controllers/contacts.js";
import validateBody from "../../middleware/validateBody.js";
import * as schemas from "../../schemas/contacts.js";

const router = express.Router();

//GET - all
router.get("/", ctrl.getAll);

//GET - by id
router.get("/:contactId", ctrl.getById);

//POST - add
router.post("/", validateBody(schemas.addSchema), ctrl.AddContact);

//PUT - update by id
router.put("/:contactId", validateBody(schemas.addSchema), ctrl.modifyContact);

//DELETE -  by id
router.delete("/:contactId", ctrl.deleteContact);

export default router;
