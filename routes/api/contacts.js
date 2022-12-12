const express = require("express");
const router = express.Router();
const controllers = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const validateBody = require("../../middlewares/validateBody");
const {
  addSchema,
  updateSchema,
  statusUpdateSchema,
} = require("../../schemas");
const { isValidId } = require("../../middlewares");

router.get("/", ctrlWrapper(controllers.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(controllers.getById));

router.post("/", validateBody(addSchema), ctrlWrapper(controllers.add));

router.delete("/:contactId", isValidId, ctrlWrapper(controllers.remove));

router.put(
  "/:contactId",
  isValidId,
  validateBody(updateSchema, "missing fields"),
  ctrlWrapper(controllers.update)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(statusUpdateSchema, "missing field favorite"),
  ctrlWrapper(controllers.statusUpdate)
);

module.exports = router;
