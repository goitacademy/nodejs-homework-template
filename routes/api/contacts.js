const express = require("express");

const router = express.Router();
const controllers = require("../../controler/contacts");
const { validateBody, isValidId, updateFavorite } = require("../../middelwars");
const { addSchema } = require("../../models/contact");
router.get("/", controllers.getAll);

router.get("/:id", isValidId, controllers.getById);

router.post("/", validateBody(addSchema), controllers.add);

router.delete("/:id", isValidId, controllers.deleteById);

router.put("/:id", isValidId, validateBody(addSchema), controllers.updateById);
router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavorite),
  controllers.updateFavorite
);
module.exports = router;
