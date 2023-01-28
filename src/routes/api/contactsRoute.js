const express = require("express");
const { contactsController } = require("../../controllers");

const {
  postContactValidation,
  putContactValidation,
  putchContactValidation,
} = require("../../middlewares/contactsValidationMiddleware");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.use(auth);

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", postContactValidation, contactsController.addNewContact);

router.delete("/:contactId", contactsController.removeContactById);

router.put(
  "/:contactId",
  putContactValidation,
  contactsController.changeContactById
);

router.patch(
  "/:contactId/favorite",
  putchContactValidation,
  contactsController.updateStatusById
);

module.exports = router;
