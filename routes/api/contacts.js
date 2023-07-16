const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/contacts");
const schemas = require("../../schemas/contacts");
const { validateBody } = require("../../middlewares/validateBody");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.contactSchema), ctrl.createNew);

router.delete("/:contactId", ctrl.deleteById);

router.put(
  "/:contactId",
  validateBody(schemas.emptySchema),
  validateBody(schemas.contactSchema),
  ctrl.updateById
);

module.exports = router;
