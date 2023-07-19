import express from "express";
import ctrl from "../../controllers/contacts.js";
import isValidId from "../../middleware/isValidId.js";
import validateBody from "../../middleware/validateBody.js";
import { addSchema, updateFavoriteSchema } from "../../models/contact.js";
 
const router = express.Router();

//GET - all
router.get("/", ctrl.getAll);

// //GET - by id
router.get("/:contactId", isValidId, ctrl.getById);

// //POST - add
router.post("/", validateBody(addSchema), ctrl.AddContact);

// //PUT - update by id
router.put("/:contactId", validateBody(addSchema), isValidId, ctrl.modifyContact);

// // PATCH - edit by id
router.patch("/:contactId/favorite", validateBody(updateFavoriteSchema), isValidId, ctrl.updateStatusContact);

// //DELETE -  by id
router.delete("/:contactId", isValidId, ctrl.deleteContact);

export default router;
