import { Router } from "express";

import { isValidateId } from "../../middlewars/index.js";

const contactsRouter = Router();

import {contactControl} from '../../controllers/index.js';

contactsRouter.get("/", contactControl.getAll);

contactsRouter.get("/:id", isValidateId, contactControl.getById);

contactsRouter.post("/", contactControl.createNewContact);

contactsRouter.delete("/:id", isValidateId, contactControl.deleteById);

contactsRouter.put("/:id", isValidateId, contactControl.updateContactById);

contactsRouter.patch("/:id/favorite", isValidateId, contactControl.updateFavorite);

export default contactsRouter;
