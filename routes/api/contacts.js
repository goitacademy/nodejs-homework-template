const express = require("express");
const controllers = require("../../controllers/contactControllers");
const {
  validation,
  validationRequired,
  validationFavorite,
} = require("../../middlewares/contactsValidate");

const router = express.Router();

router.get("/", controllers.listContacts);

router.get("/:id", controllers.getContactById);

router.post("/", validationRequired, controllers.addContact);

router.delete("/:id", controllers.removeContact);

router.put("/:id", validation, controllers.updateContact);

router.patch(
  "/:id/favorite",
  validationFavorite,
  controllers.updateStatusContact
);

module.exports = router;
