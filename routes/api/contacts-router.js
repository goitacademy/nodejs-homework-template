import express from "express";
import {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatusContact,
} from "../../controllers/contacts/index.js";
import { validateBody } from "../../decorators/index.js";
import contactSchema from "../../schemas/contact-schema.js";
import {isValidId, authenticate } from "../../middlewara/index.js";

const contactAddValidate = validateBody(contactSchema.contactAddSchema);

const contactUpdateFavoriteValidate = validateBody(contactSchema.contactUpdateFavoriteSchema);
const contactRouter = express.Router();

contactRouter.use(authenticate);

contactRouter.get("/", getAll);

contactRouter.get("/:id", isValidId, getById);

contactRouter.post('/', contactAddValidate, add);

contactRouter.put('/:id', isValidId, contactAddValidate, updateById);

contactRouter.patch('/:id/favorite', isValidId, contactUpdateFavoriteValidate, updateStatusContact);
 
contactRouter.delete('/:id', deleteById);


export default contactRouter;
