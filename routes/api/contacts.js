const express = require("express");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

const { validateBody } = require("../../middlewares/validateBody");
const addSchema = require("../../schemas/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(addSchema.addShema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",
  validateBody(addSchema.addShemaPut),
  ctrl.updateContact
);

router.patch("/:contactId", ctrl.updateStatusContact);

module.exports = router;
