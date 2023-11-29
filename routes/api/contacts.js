const express = require("express");
const {
  getAll,
  getByID,
  add,
  deleteByID,
  update,
  updateStatusContactavorite,
} = require("../../controllers/contacts");
const router = express.Router();
const { validateBody, isValidID } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", getAll);
router.get("/:contactId", isValidID, getByID);
router.post("/", validateBody(schemas.addSchema), add);
router.delete("/:contactId", isValidID, deleteByID);
router.put("/:contactId", isValidID, validateBody(schemas.addSchema), update);
router.patch(
  "/:contactId/favorite",
  isValidID,
  validateBody(schemas.updateSchema),
  updateStatusContactavorite
);

module.exports = router;
