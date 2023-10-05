const express = require("express");
const router = express.Router();

const { crtlContacts } = require("../controllers/controllers");

const { validId } = require("../middlewares/isValidId");

const { validateBody } = require("../middlewares/validateBody");

const {
  validationSchema,
  validationFavorite,
} = require("../utils/validation/contactValidationSchemas");

router
  .route("/contacts")
  .get(crtlContacts.getAllContactsController)
  .post(validateBody(validationSchema), crtlContacts.createContactController);

router
  .route("/contacts/:id")
  .get(crtlContacts.getContactByIdController)
  .put(
    validId,
    validateBody(validationSchema),
    crtlContacts.updateContactController
  )
  .delete(validId, crtlContacts.deleteContactController);

router
  .route("/contacts/:id/favorite")
  .patch(
    validId,
    validateBody(validationFavorite),
    crtlContacts.updateContactStatus
  );

module.exports = router;
