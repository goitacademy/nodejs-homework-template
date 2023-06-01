const express = require("express");
const ctrl = require("../../controllers/contacts");
const { tryCatchWrapper } = require("../../utils");
const { validateBody } = require("../../middelwares");
const schema = require("../../schemas/");
const router = express.Router();

router.get("/", tryCatchWrapper(ctrl.getAll));

router.get("/:contactId", tryCatchWrapper(ctrl.getById));

router.post("/", validateBody(schema.addSchema), tryCatchWrapper(ctrl.add));

router.delete("/:contactId", tryCatchWrapper(ctrl.remove));

router.put(
  "/:contactId",
  validateBody(schema.updateSchema),
  tryCatchWrapper(ctrl.updateById)
);

module.exports = router;

