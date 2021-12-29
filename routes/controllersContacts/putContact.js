import { Router } from "express";
import { updateContact } from "../../controllers";
import { validateId, validateUpdate } from "../../middleware";
import guard from "../../middleware/guard";

const routerPutContact = new Router();
routerPutContact.put(
  "/:id",
  [guard, validateId, validateUpdate],
  updateContact
);
export default routerPutContact;
