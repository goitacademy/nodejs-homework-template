const express = require("express");

const controller = require("../../controllers/contacts");

const router = express.Router();

const { validateAddBody, validateUpdBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", controller.listContacts);

router.get("/:contactId", controller.getContactById);

router.post("/", validateAddBody(schemas.addSchema), controller.addContact);

router.delete("/:contactId", controller.removeContact);

router.put(
  "/:contactId",
  validateUpdBody(schemas.updSchema),
  controller.updateContactById
);

module.exports = router;
