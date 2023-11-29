const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, checkBody } = require("../../middlewares");

const addContactSchema = require("../../schemas/addContacts");

const updateContactSchema = require("../../schemas/updateContacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", checkBody, validateBody(addContactSchema), ctrl.addContact);

router.delete("/:id", ctrl.removeContact);

router.put(
  "/:id",
  checkBody,
  validateBody(updateContactSchema),
  ctrl.updateContact
);

module.exports = router;
