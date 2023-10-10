import express from "express";
const contactsRouter = express.Router();
// ? // імпорт мідлвари валідації переданого тіла контакту ;
import contactValidation from "../../middleware/validation/contact-validation.js";
// ? // Імпорт контроллеру взаємодії з контактами;
import contactsController from "../../controllers/contacts-controller.js";
// ? 1) Роутер запиту на список всіх контактів ;
contactsRouter.get("/", contactsController.getAllContacts);
// ? 2) Роутер запиту на один контакт за айді ;
contactsRouter.get("/:contactId", contactsController.getContactById);
// ? 3) Роутер додавання нового контакту з тілом запиту;
contactsRouter.post(
  "/",
  contactValidation.addContactValidate,
  contactsController.addContact
);
// ? 4) Роутер запиту видалення існуючого контакту за айді ;
contactsRouter.delete("/:contactId", contactsController.removeContactById);
// ? 5) Роутер оновлення існуючого контакту ;
contactsRouter.put(
  "/:contactId",
  contactValidation.addContactValidate,
  contactsController.updateContactById
);

export default contactsRouter;
