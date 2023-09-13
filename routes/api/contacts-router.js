import express from "express";
import ctrl from "../../controllers/contactsControllers.js";
import contactSchemas from "../../schemas/contactsSchema.js";
import validateBody from "../../decorators/validateBody.js";
import {isValidId} from "../../middlewares/index.js"

const contactsAddValidate = validateBody(contactSchemas.contactAddSchema);
const contactsUpdateFavoriteValidate = validateBody(contactSchemas.contactsUpdateFavoriteSchema)

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", isValidId, ctrl.getById);

contactsRouter.post("/",contactsAddValidate,  ctrl.addContact);

contactsRouter.delete("/:id", isValidId, ctrl.removeContactById);

contactsRouter.put("/:id", isValidId, contactsAddValidate,  ctrl.updateContactById);

contactsRouter.patch("/:id/favorite", isValidId, contactsUpdateFavoriteValidate, ctrl.updateStatusContact );



export default contactsRouter;
