const express = require("express");
const { validateBody, isValidId } = require("../../middlewares");
const router = express.Router();
const { schemas } = require("../../models/contact");

const cntrl = require("../../controllers/contacts");
router.get("/", cntrl.getAll);

router.get("/:id", isValidId, cntrl.getById);

router.post("/", validateBody(schemas.addSchema), cntrl.add);

router.delete("/:id", isValidId, cntrl.deleteById);

router.put("/:id", isValidId, validateBody(schemas.addSchema), cntrl.update);
router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  cntrl.updateStatusContact
);

module.exports = router;
