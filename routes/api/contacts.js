const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody, haveBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/",
  haveBody,
  validateBody(schemas.addSchema),
  ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put(
  "/:contactId",
  haveBody,
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);

module.exports = router;
