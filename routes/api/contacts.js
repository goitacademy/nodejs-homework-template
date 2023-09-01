const express = require("express");

const router = express.Router();

const controls = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares/validateBody");

const schema = require("../../schemas/contacts");

router.get("/", controls.getAllContacts);

router.get("/:contactId", controls.getContactById);

router.post("/", validateBody(schema.validationSchema), controls.addNewContact);

router.delete("/:contactId", controls.removeContactById);

router.put(
  "/:contactId",
  validateBody(schema.validationSchema),
  controls.updateContactById
);

module.exports = router;
