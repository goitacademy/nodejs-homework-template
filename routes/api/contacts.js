const express = require("express");
const controllers = require("../../controllers/contactControllers");
const {
  validation,
  validationRequired,
} = require("../../middlewares/contactsValidate");

const router = express.Router();

router.get("/", controllers.listContacts);

router.get("/:id", controllers.getContactById);

router.post("/", validationRequired, controllers.addContact);

router.delete("/:id", controllers.removeContact);

router.put("/:id", validation, controllers.updateContact);

module.exports = router;
