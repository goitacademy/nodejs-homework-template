const express = require("express");
const {
  getAll,
  getByID,
  add,
  deleteByID,
  update,
  updateStatusContact,
} = require("../../controllers/contacts");
const router = express.Router();
const { validateBody, isValidID, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, getAll);
router.get("/:contactId", authenticate, isValidID, getByID);
router.post("/", authenticate, validateBody(schemas.addSchema), add);
router.delete("/:contactId", authenticate, isValidID, deleteByID);
router.put(
  "/:contactId",
  authenticate,
  isValidID,
  validateBody(schemas.addSchema),
  update
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidID,
  validateBody(schemas.updateSchema),
  updateStatusContact
);

module.exports = router;
