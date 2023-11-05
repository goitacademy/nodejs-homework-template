const express = require("express");

const controller = require("../../controllers/contacts");

const router = express.Router();

const { validateBody } = require("../../middlewares");
const addSchema = require("../../schemas/contacts");

router.get("/", controller.listContacts);

router.get("/:contactId", controller.getContactById);

router.post("/", validateBody(addSchema), controller.addContact);

router.delete("/:contactId", controller.removeContact);

router.put(
  "/:contactId",
  validateBody(addSchema),
  controller.updateContactById
);

module.exports = router;
