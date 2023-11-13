// routes\api\contacts.js
const express = require("express");
const controller = require("../../controllers/contacts");
const { ensureAuthenticated } = require("../../middlewares/validateJWT");
const contactRouter = express.Router();

module.exports = () => {
  // ensureAuthenticated is auth
  // contactRouter.get("/", ensureAuthenticated, controller.listContacts);
  contactRouter.get(
    "/current",
    ensureAuthenticated,
    controller.getContactCurrent
  );
  contactRouter.get("/:owner", ensureAuthenticated, controller.getContactOwner);

  contactRouter.get(
    "/:owner/:id",
    ensureAuthenticated,
    controller.getContactOwnerById
  );

  // contactRouter.post("/", controller.addContact);

  contactRouter.patch(
    "/:owner/:id",
    ensureAuthenticated,
    controller.updateContact
  );

  contactRouter.patch(
    "/favorite/:owner/:id",
    ensureAuthenticated,
    controller.updateStatusContact
  );

  contactRouter.patch(
    "/logout/:owner/:id",
    ensureAuthenticated,
    controller.updateTokenRemove
  );

  contactRouter.delete("/:owner/:id", ensureAuthenticated, controller.removeContact);

  return contactRouter;
};
