const express = require("express");

const router = express.Router();
const controllers = require("../../controler/contacts");
const {
  validateBody,
  isValidId,
  updateFavorite,
  authenticate,
} = require("../../middelwars");
const { addSchema } = require("../../models/contact");
router.get("/", authenticate, controllers.getAll);

router.get("/:id", authenticate, isValidId, controllers.getById);

router.post("/", authenticate, validateBody(addSchema), controllers.add);

router.delete("/:id", authenticate, isValidId, controllers.deleteById);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(addSchema),
  controllers.updateById
);
router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavorite),
  controllers.updateFavorite
);
module.exports = router;
