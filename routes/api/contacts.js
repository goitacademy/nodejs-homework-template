const express = require("express");
const router = express.Router();

const controllers = require("../../controllers/contacts/index");
const validator = require("../../middleWares/index");
router
  .route("/")
  .get(validator.ctrlWrapper(controllers.listContacts))
  .post(
    validator.contactValidator(),
    validator.ctrlWrapper(controllers.addContact)
  );

router
  .route("/:contactId")
  .get(validator.ctrlWrapper(controllers.getContactById))
  .delete(validator.ctrlWrapper(controllers.removeContact))
  .put(
    validator.updContactValidator(),
    validator.ctrlWrapper(controllers.updateContact)
  );
router
  .route("/:contactId/favorite")
  .patch(
    validator.favoriteValidator(),
    validator.ctrlWrapper(controllers.updateStatusContact)
  );
// ================ПРИКЛАД========================
// router.get("/",controllers.listContacts);

module.exports = router;
