const contactsRoutes = require("express").Router();
const contactsControllers = require("../controllers/contactsController");

// додати контакт
contactsRoutes.post(
  "/contacts",
  (req, res, next) => {
    console.log("joi");
    next();
  },
  contactsControllers.addContact
);
// отримати всі контакти
contactsRoutes.get("/contacts", contactsControllers.getAll);
// отримати один контакт
contactsRoutes.get("/contacts/:id", contactsControllers.getById);
// оновити контакт
contactsRoutes.put("/contacts/:id", contactsControllers.update);
contactsRoutes.patch("/contacts/:id/favorite", contactsControllers.updateContactStatus);
// видалити контакт
contactsRoutes.delete("/contacts/:id", contactsControllers.remove);

module.exports = contactsRoutes;
// Cannot GET /api/v1/contacts
