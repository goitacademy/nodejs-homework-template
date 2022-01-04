import { Router } from "express";
import guard from "../../middlewares/users/guard";
import {
  validateId,
  validateUpdateFavorite,
} from "../../middlewares/contacts/validation";
import { ContactsService } from "../../controllers/contacts";
const patchContactRouter = new Router();
const contactsService = new ContactsService();

patchContactRouter.patch(
  "/:id/favorite",
  [guard, validateId, validateUpdateFavorite],
  contactsService.updateContactCb
);
export default patchContactRouter;
