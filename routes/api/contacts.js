const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { validateBody } = require("../../middlewarse");

const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody.validateBodyPost(schemas.schema), ctrl.post);

router.delete("/:contactId", ctrl.deleteById);

router.put(
  "/:contactId",
  validateBody.validateBodyPut(schemas.schema),
  ctrl.putById
);

module.exports = router;
