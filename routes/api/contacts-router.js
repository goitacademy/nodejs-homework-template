import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody, isValidId, authenticate } from "../../middlewares/index.js";

import {validateBody} from "../../decorators/index.js";

import { contactAddSchema, contactUpdateSchema, contactUpdateFavoriteSchema } from "../../models/Contact.js";

const router = express.Router()

router.get("/", authenticate, contactsController.getAll);

router.get("/:contactId", authenticate, isValidId, contactsController.getById);

router.post("/", authenticate, isEmptyBody, validateBody(contactAddSchema), contactsController.add);

router.put("/:contactId", authenticate, isValidId, isEmptyBody, validateBody(contactUpdateSchema), contactsController.updateById);

router.patch("/:contactId/favorite", authenticate, isValidId, isEmptyBody, validateBody(contactUpdateFavoriteSchema), contactsController.updateById);

router.delete("/:contactId", authenticate, isValidId, contactsController.deleteById)
  
export default router;
