const express = require("express");
const contrs = require("../../controllers/contacts");
const router = express.Router();
const { validateBody, isValidId } = require("../../middlewares");
const {
  addSchema,
  toggleFavoriteSchema,
} = require("../../schemas/addContSchema");
router.get("/", contrs.getAll);
router.get("/:contactId", isValidId, contrs.getById);
router.post("/", validateBody(addSchema), contrs.addCont);
router.delete("/:contactId", isValidId, contrs.removeCont);
router.put(
  "/:contactId",
  isValidId,
  validateBody(addSchema),
  contrs.updateById
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(toggleFavoriteSchema),
  contrs.updateById
);
module.exports = router;
