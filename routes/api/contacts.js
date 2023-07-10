const express = require("express");

const router = express.Router();

const controllers = require("../../Controllers/contacts");

const ValidBody = require("../../middleWars");

const schemas = require("../../Helpers/index");

router.get("/", controllers.listContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", ValidBody(schemas.AddSchema), controllers.addContact);

router.delete("/:contactId", controllers.removeContact);

router.put(
  "/:contactId",
  ValidBody(schemas.AddSchema),
  controllers.updateContact
);

module.exports = router;
