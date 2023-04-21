const express = require("express");

const controllers = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schema = require("../../schemas/contacts");

const router = express.Router();

router.get("/", controllers.getAllContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", validateBody(schema.addSchema), controllers.addContact);

router.delete("/:contactId", controllers.deleteContact);

router.put(
  "/:contactId",
  validateBody(schema.addSchema),
  controllers.updateContact
);

module.exports = router;
