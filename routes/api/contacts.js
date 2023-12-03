// routes\api\contacts.js
const express = require("express");
const controller = require("../../controllers/contacts");
const { ensureAuthenticated } = require("../../middlewares/validateJWT");
const contactRouter = express.Router();

module.exports = () => {
  // ensureAuthenticated is auth
  // contactRouter.get("/", ensureAuthenticated, controller.listContacts)

  // All list
  contactRouter.get(
    "/list",
    ensureAuthenticated,
    controller.listContacts
  );

  // list owner
  contactRouter.get("/", ensureAuthenticated, controller.getContactOwner);

  // list owner Id
  contactRouter.get(
    "/:id",
    ensureAuthenticated,
    controller.getContactOwnerById
  );

  contactRouter.post("/", ensureAuthenticated, controller.addContact);

  contactRouter.patch(
    "/:id/favorite/",
    ensureAuthenticated,
    controller.updateFavoriteContact
  );

  contactRouter.delete("/:id", ensureAuthenticated, controller.removeContact);

  // contactRouter.get('/:id', controller.getContactById)

  // contactRouter.put('/:id', controller.updateContact)

  // contactRouter.delete('/:id', controller.removeContact)

  return contactRouter;
};
