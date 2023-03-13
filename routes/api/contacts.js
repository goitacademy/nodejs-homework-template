const express = require("express");
const router = express.Router();

const controllers = require("../../controllers/contacts/index");
const validator = require("../../middleWares/joiContactValidator.js");
router
  .route("/")
  .get(controllers.listContacts)
  .post(validator.contactValidator(), controllers.addContact);

router
  .route("/:contactId")
  .get(controllers.getContactById)
  .delete(controllers.removeContact)
  .put(validator.updContactValidator(), controllers.updateContact);

// ================ПРИКЛАД========================
// router.get("/",controllers.listContacts);

module.exports = router;
