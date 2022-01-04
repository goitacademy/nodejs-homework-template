import { Router } from "express";
// import { updateContactCb } from "../../controllers/contacts";
import guard from "../../middlewares/users/guard";
import {
  validateUpdate,
  validateId,
} from "../../middlewares/contacts/validation";
import { ContactsService } from "../../controllers/contacts";
const contactsService = new ContactsService();
const updateRouter = new Router();
updateRouter.put(
  "/:id",
  [guard, validateId, validateUpdate],
  contactsService.updateContactCb
);
export default updateRouter;
