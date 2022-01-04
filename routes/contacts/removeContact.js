import { Router } from "express";
import { validateId } from "../../middlewares/contacts/validation";
import guard from "../../middlewares/users/guard";
import { ContactsService } from "../../controllers/contacts";
const contactsService = new ContactsService();
const deleteRouter = new Router();

deleteRouter.delete(
  "/:id",
  [guard, validateId],
  contactsService.removeContactCb
);
export default deleteRouter;
