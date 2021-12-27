import { Router } from "express";
import { updateContact } from "../../controllers";
import { validateId, validateUpdate } from "../../middleware";

const routerPutContact = new Router();
routerPutContact.put("/:id", validateId, validateUpdate, updateContact);
export default routerPutContact;
