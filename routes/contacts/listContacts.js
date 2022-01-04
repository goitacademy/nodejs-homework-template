import { Router } from "express";
import guard from "../../middlewares/users/guard";
import { validateQuery } from "../../middlewares/contacts/validation";
import { ContactsService } from "../../controllers/contacts";
const contactsService = new ContactsService();
const listContactsRouter = new Router();

listContactsRouter.get(
  "/",
  [guard, validateQuery],
  contactsService.getContacts
);
export default listContactsRouter;
