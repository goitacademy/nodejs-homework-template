const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody, haveBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", haveBody, validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  isValidId,
  haveBody,
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);

module.exports = router;
