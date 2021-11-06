const express = require("express");
const router = express.Router();

const { validation } = require("../../../middlewares/validation");
const {
  joiContactsSchema,
  joiFavoriteSchema,
} = require("../../../models/contact");
const contactsControllers = require("../../../controllers/contacts");

router.get("/", contactsControllers.listContactsController);

router.get("/:contactId", contactsControllers.getContactByIdController);

router.post(
  "/",
  validation(joiContactsSchema),
  contactsControllers.addContactController
);

router.delete("/:contactId", contactsControllers.removeContactController);

router.put(
  "/:contactId",
  validation(joiContactsSchema),
  contactsControllers.updateByIdController
);
router.patch(
  "/:contactId/favorite",
  validation(joiFavoriteSchema),
  contactsControllers.updateFavoriteController
);

module.exports = router;
