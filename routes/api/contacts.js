const express = require("express");
const schema = require("../../schemas/contacts");
const { validateBody } = require("../../middlewares/index");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schema.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",
  validateBody(schema.addSchema),
  ctrl.updateContactById
);
router.patch(
  "/:contactId/favorite",
  validateBody(schema.addSchema),
  ctrl.updateStatusContact
);
module.exports = router;
