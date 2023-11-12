const express = require("express");
const { Contact } = require("../../controllers");
const { authenticate, validateID, validateBody } = require("../../middleware");
const { addSchema, patchSchema } = require("../../schemas");
const router = express.Router();

router.get("/", authenticate, Contact.getAll);

router.get("/:contactId", validateID, authenticate, Contact.getById);

router.post("/", authenticate, validateBody(addSchema), Contact.add);

router.delete("/:contactId", authenticate, validateID, Contact.remove);

router.put(
  "/:contactId",
  authenticate,
  validateID,
  validateBody(addSchema),
  Contact.update
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateID,
  validateBody(patchSchema),
  Contact.updateStatus
);

module.exports = router;
