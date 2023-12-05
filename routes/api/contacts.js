const express = require("express");

const ctrl = require("../../controllers/contacts");
const { isEmptyBody, validateBody } = require("../../middlewars");
const schema = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.listContact);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schema.addSchema), ctrl.addContact);

router.put(
  "/:id",
  isEmptyBody,
  validateBody(schema.addSchema),
  ctrl.updateContact
);
router.delete("/:id", ctrl.removeContact);
module.exports = router;
