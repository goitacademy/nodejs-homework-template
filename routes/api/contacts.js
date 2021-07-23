const express = require("express");
const router = express.Router();
const validate = require("./validation");
const contactsController = require("../../controllers/contacts");

router
  .get("/", contactsController.getAll)
  .post("/", validate.createContact, contactsController.create);

router
  .get("/:id", contactsController.getById)
  .delete("/:id", contactsController.remove)
  .put("/:id", validate.updateContact, contactsController.update);

router.patch(
  "/:id/vaccinated",
  validate.updateStatusContact,
  contactsController.updateStatus
);

module.exports = router;
