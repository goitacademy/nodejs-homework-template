import { Router } from "express";
import guard from "../../middlewares/users/guard";
import { validateId } from "../../middlewares/contacts/validation";
import { ContactsService } from "../../controllers/contacts";
const contactsService = new ContactsService();
const getByIdRouter = new Router();
getByIdRouter.get(
  "/:id",
  [guard, validateId],
  contactsService.getContactByIdCb
);
export default getByIdRouter;
