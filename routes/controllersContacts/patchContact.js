import { Router } from "express";
import { updateContact } from "../../controllers/contacts";
// import contactsApp from "../../contactsApp/index";
import middleware from "../../middleware";
// import { HttpCode } from "../../lib/constants";

const routerPatchContact = new Router();
routerPatchContact.patch(
  "/:id/favorite",
  middleware.validateId,
  middleware.validateUpdateFavorite,
  updateContact
);
export default routerPatchContact;
