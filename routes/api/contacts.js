const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const validateBody = require("../../midlewares/validateBody");
const schema = require("../../schemas/contacts");
router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContatcById);

router.post("/", validateBody(schema.addSchema), ctrl.postContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put(
  "/:contactId",
  validateBody(schema.addSchema),
  ctrl.updateContactById
);

module.exports = router;
