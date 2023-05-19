const express = require("express");
const router = express.Router();
const cntController = require("../../Controllers/contact-controller");
const isValidId = require("../../middlewares/isValidId");

const schema = require("../../models/schemas/joiContactsSchema");
const { validationBody } = require("../../middlewares");

router.get("/", cntController.getAllContacts);

router.get("/:id", isValidId, cntController.getContactById);

router.post(
  "/",
  validationBody(schema.addContactSchema),
  cntController.addContact
);

router.put(
  "/:id",
  validationBody(schema.addContactSchema),

  cntController.updateContact
);

router.patch(
  "/:id/favorite",
  validationBody(schema.setFaforitedSchema),

  cntController.setFaforited
);

router.delete("/:id", cntController.removeContact);

module.exports = router;
