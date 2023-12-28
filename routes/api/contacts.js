const express = require("express");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const router = express.Router();
const { schemas } = require("../../models/contact");

const cntrl = require("../../controllers/contacts");
router.get("/", authenticate, cntrl.getAll);

router.get("/:id", authenticate, isValidId, cntrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), cntrl.add);

router.delete("/:id", authenticate, isValidId, cntrl.deleteById);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  cntrl.update
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  cntrl.updateStatusContact
);

module.exports = router;
