import { Router } from "express";
import { updateContact } from "../../controllers";
import { validateId, validateUpdateFavorite } from "../../middleware";
import guard from "../../middleware/guard";

const routerPatchContact = new Router();
routerPatchContact.patch(
  "/:id/favorite",
  [guard, validateId, validateUpdateFavorite],
  updateContact
);
export default routerPatchContact;
