const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const shemas = require("../../shemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(shemas.addSchema), ctrl.addContact);

router.delete(
  "/:contactId",

  ctrl.removeContact
);

router.put("/:contactId", validateBody(shemas.addSchema), ctrl.removeContact);

module.exports = router;
