// routes\api\contacts.js
const express = require("express");
const controller = require("../../controllers/contacts");
const { ensureAuthenticated } = require("../../middlewares/validateJWT");
const contactRouter = express.Router();

module.exports = () => {
  // ensureAuthenticated is auth
  // contactRouter.get("/", ensureAuthenticated, controller.listContacts);

  contactRouter.get("/", ensureAuthenticated, controller.getContactOwner);

  contactRouter.get(
    "/:id",
    ensureAuthenticated,
    controller.getContactOwnerById
  );

  contactRouter.patch(
    "/:id/subscription",
    ensureAuthenticated,
    controller.updateContactSubscription
  );

  contactRouter.patch(
    "/:id/favorite/",
    ensureAuthenticated,
    controller.updateStatusContact
  );

  contactRouter.delete(
    "/:id",
    ensureAuthenticated,
    controller.removeContact
  );

  return contactRouter;
};
