const express = require("express");
const router = express.Router();

const controllers = require("../../controllers/contacts/index");
const contactValidator = require("../../middleWares/joiContactValidator.js");
router
  .route("/")
  .get(controllers.listContacts)
  .post(contactValidator(), controllers.addContact);

router
  .route("/:contactId")
  .get(controllers.getContactById)
  .delete(controllers.removeContact)
  .put(contactValidator(), controllers.updateContact);

// ================ПРИКЛАД========================
// router.get("/",controllers.listContacts);

module.exports = router;
