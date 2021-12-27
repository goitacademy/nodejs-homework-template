import { Router } from "express";
import { updateContact } from "../../controllers";
import { validateId, validateUpdateFavorite } from "../../middleware";

const routerPatchContact = new Router();
routerPatchContact.patch(
  "/:id/favorite",
  validateId,
  validateUpdateFavorite,
  updateContact
);
export default routerPatchContact;
