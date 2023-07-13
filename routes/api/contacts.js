import express from "express";
import * as ctrl from "../../controllers/contacts.js";

const router = express.Router();

//GET - all
router.get("/", ctrl.getAll);

//GET - by id
router.get("/:contactId", ctrl.getById);

//POST - add
router.post("/", ctrl.AddContact);

//PUT - update by id
router.put("/:contactId", ctrl.modifyContact);

//DELETE -  by id
router.delete("/:contactId", ctrl.deleteContact);

export default router;
