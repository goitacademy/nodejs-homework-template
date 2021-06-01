const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateFavoriteStatus,
  validateContactId,
} = require("./validation");

router.use((req, res, next) => {
  console.log(req.url);
  next();
});

router
  .get("/", ctrl.listContacts)
  .post("/", validationCreateContact, ctrl.addContact);

router
  .get("/:contactId", validateContactId, ctrl.getContactById)
  .delete("/:contactId", validateContactId, ctrl.removeContact)
  .put("/:contactId", validateContactId, validationUpdateContact, ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  validateContactId,
  validationUpdateFavoriteStatus,
  ctrl.updateStatusContact
);

module.exports = router;
