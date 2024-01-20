const express = require("express");

const router = express.Router();
const contrl = require("../../controllers/contacts");
const { validateBody } = require("../../midlewares");
const schemas = require("../../schemas/contacts");
router.get("/", contrl.getAll);

router.get("/:contactId", contrl.getById);

router.post("/", validateBody(schemas.userInputSchema), contrl.add);

router.delete("/:contactId", contrl.deleteById);

router.put(
  "/:contactId",
  validateBody(schemas.userInputSchema),
  contrl.updateById
);

module.exports = router;
