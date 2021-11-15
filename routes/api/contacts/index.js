const express = require("express");
const router = express.Router();

const { validation, authenticate } = require("../../../middlewares");
const {
  joiContactsSchema,
  joiFavoriteSchema,
} = require("../../../models/contact");
const contactsControllers = require("../../../controllers/contacts");

router.get("/", authenticate, contactsControllers.listContactsController);
router.get(
  "/filter",
  authenticate,
  contactsControllers.listContactsFavoriteController
);

router.get(
  "/:contactId",
  authenticate,
  contactsControllers.getContactByIdController
);

router.post(
  "/",
  authenticate,
  validation(joiContactsSchema),
  contactsControllers.addContactController
);

router.delete(
  "/:contactId",
  authenticate,
  contactsControllers.removeContactController
);

router.put(
  "/:contactId",
  authenticate,
  validation(joiContactsSchema),
  contactsControllers.updateByIdController
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  validation(joiFavoriteSchema),
  contactsControllers.updateFavoriteController
);

module.exports = router;
