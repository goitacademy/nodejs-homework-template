const contactsRoutes = require("express").Router();
const contacts = require("../controllers/index").contacts; 
const { authorizeUser } = require("../midlewares/authorization");


// додати контакт
contactsRoutes.post("/", authorizeUser, contacts.addContact);
// отримати всі контакти
contactsRoutes.get("/", authorizeUser, contacts.getAll);
// отримати один контакт
contactsRoutes.get("/:id", authorizeUser, contacts.getById);
// оновити контакт
contactsRoutes.put("/:id", authorizeUser, contacts.update);
contactsRoutes.patch("/:id/favorite",  authorizeUser,  contacts.updateContactStatus);
// видалити контакт
contactsRoutes.delete("/:id", authorizeUser, contacts.remove);

module.exports = contactsRoutes;
