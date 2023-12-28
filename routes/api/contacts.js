const express = require("express");
const router = express.Router();

const { contactsController } = require("../../controllers");
const { checkContactId } = require("../../middlewares/userMiddleware");

router
  .route("/")
  .get(contactsController.getContacts)
  .post(contactsController.createContact);

router.use("/:id", checkContactId);
router
  .route("/:id")
  .get(contactsController.getContactById)
  .delete(contactsController.deleteContact)
  .put(contactsController.updateContactById);

router.patch("/:contactId/favorite", contactsController.updateFavoriteStatus);

module.exports = router;
