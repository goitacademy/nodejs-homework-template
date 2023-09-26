const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middleware");

const schemas = require("../../schemas");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post(
  "/",
  validateBody(schemas.addSchema, "Missing required name field"),
  ctrl.add
);

router.delete("/:contactId", ctrl.removeById);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema, "Missing fields"),
  ctrl.updateById
);

module.exports = router;
