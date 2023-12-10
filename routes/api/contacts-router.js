import express from "express";
import { contactAddSchema, contactUpdateSchema, contactFavoriteSchema } from "../../models/Contact.js";
import contactsController from "../../controllers/contacts-controller.js";
import { validateBody } from "../../decorators/index.js";
import {authenticate, isEmptyBody, isValidId, upload } from "../../middlewares/index.js";


const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getListContacts);

contactsRouter.get("/:id", isValidId, contactsController.getContactById);
// upload.array("poster",8)
//contactsRouter.post("/", upload.single("avatarURL"), isEmptyBody, validateBody(contactAddSchema), contactsController.addContact);

contactsRouter.put("/:id", isValidId, isEmptyBody, validateBody(contactUpdateSchema), contactsController.updateById);

contactsRouter.patch("/:id/favorite", isValidId, isEmptyBody, validateBody(contactFavoriteSchema), contactsController.updateById);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

export default contactsRouter;

