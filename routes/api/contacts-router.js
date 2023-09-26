import express from "express";
const contactsRouter = express.Router();
// ? // імпорт мідлвари валідації переданого тіла контакту ;
import contactValidation from "../../middlewares/validation/contact-validation.js";
// ? // Імпорт контроллеру взаємодії з контактами;
import contactsController from "../../controllers/contacts-controller.js";

import { isValidId } from "../../middlewares/validation/id-validation/index.js";
// ? 1) Роутер запиту на список всіх контактів ;
contactsRouter.get("/", contactsController.getAllContacts);
// ? 2) Роутер запиту на один контакт за айді ;
contactsRouter.get("/:contactId", isValidId, contactsController.getContactById);
// ? 3) Роутер додавання нового контакту з тілом запиту;
contactsRouter.post(
  "/",
  contactValidation.addContactValidate,
  contactsController.addContact
);
// ? 4) Роутер оновлення існуючого контакту ;
contactsRouter.put(
  "/:contactId",
  isValidId,
  contactValidation.updateContactById,
  contactsController.updateContactById
);
// ? 5) Роутер зміни статусу favorite контакту за айді ;
contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  contactValidation.updateFavoriteFieldById,
  contactsController.updateContactById
);
// ? 6) Роутер запиту видалення існуючого контакту за айді ;
contactsRouter.delete(
  "/:contactId",
  isValidId,
  contactsController.removeContactById
);

export default contactsRouter;
