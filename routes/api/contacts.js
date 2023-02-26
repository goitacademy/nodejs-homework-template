const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/index");

const { validateBody } = require("../../middlewares");

const schema = require("../../schemas/index");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContact);

router.post("/", validateBody(schema.contactSchema), ctrl.contactAdd);

router.put(
  "/:contactId",
  validateBody(schema.contactSchema),
  ctrl.updateContactById
);

router.delete("/:contactId", ctrl.deleteContact);

module.exports = router;
