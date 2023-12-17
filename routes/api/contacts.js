const express = require("express");

const { contactsController } = require("../../controllers");
const { checkContactId } = require("../../middlewares/userMiddleware");

const router = express.Router();

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

module.exports = router;
