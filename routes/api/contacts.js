const express = require("express");
const controllers = require("../../controllers/contactControllers");
const authenticate = require("../../middlewares/authenticate");
const {
  validation,
  validationRequired,
  validationFavorite,
} = require("../../middlewares/validate");

const router = express.Router();

router.get("/", authenticate, controllers.listContacts);

router.get("/:id", authenticate, controllers.getContactById);

router.post("/", authenticate, validationRequired, controllers.addContact);

router.delete("/:id", authenticate, controllers.removeContact);

router.put("/:id", authenticate, validation, controllers.updateContact);

router.patch(
  "/:id/favorite",
  authenticate,
  validationFavorite,
  controllers.updateStatusContact
);

module.exports = router;
