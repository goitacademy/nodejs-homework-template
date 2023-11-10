const express = require("express");

const controllers = require("../../controllers");
const { validateBody } = require("../../decorators");
const { schemaAddContact } = require("../../schemes");
const isEmptyBody = require("../../middlewares");

const router = express.Router();

router.get("/", controllers.getListContacts);

router.get("/:contactId", controllers.getContactById);

router.post(
  "/",
  isEmptyBody,
  validateBody(schemaAddContact),
  controllers.addContact
);

router.put(
  "/:contactId",
  isEmptyBody,
  validateBody(schemaAddContact),
  controllers.updateContact
);

router.delete("/:contactId", controllers.removeContact);

module.exports = router;
