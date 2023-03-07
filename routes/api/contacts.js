const express = require("express");
const router = express.Router();

const {
  postValidation,
  putValidation,
} = require("../../middlewares/validationMiddleware");

const {
  controllerGetContacts,
  controllerGetContactById,
  controllerPostNewContact,
  controllerDeleteContact,
  contollerPutContact,
} = require("../../controllers/contactsController");

router.get("/", controllerGetContacts);

router.get("/:contactId", controllerGetContactById);

router.post("/", postValidation, controllerPostNewContact);

router.delete("/:contactId", controllerDeleteContact);

router.put("/:contactId", putValidation, contollerPutContact);

module.exports = router;
