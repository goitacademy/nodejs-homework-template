import { Router } from "express";
import { updateContact } from "../../controllers/contacts";
// import contactsApp from "../../contactsApp/index";
import middleware from "../../middleware";
// import { HttpCode } from "../../lib/constants";

const routerPutContact = new Router();
routerPutContact.put(
  "/:id",
  middleware.validateId,
  middleware.validateUpdate,
  updateContact
);
export default routerPutContact;
