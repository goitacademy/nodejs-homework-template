const express = require("express");
const ctrl = require("../../controllers/contacts");
const { tryCatchWrapper } = require("../../utils");
const { validateBody } = require("../../middlewares");
const schema = require("../../schemas");
const router = express.Router();

router.get("/", tryCatchWrapper(ctrl.listContacts));

router.get("/:contactId", tryCatchWrapper(ctrl.getById));

router.post(
  "/",
  validateBody(schema.addSchema),
  tryCatchWrapper(ctrl.addContact)
);

router.delete("/:contactId", tryCatchWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validateBody(schema.updateSchema),
  tryCatchWrapper(ctrl.updateSchema)
);

module.exports = router;
