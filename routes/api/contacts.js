const express = require("express");
const { ctrlWrapper } = require("../../helpers/index");
const validateBody = require("../../middlewares/index");
const { schemas } = require("../../models/contacts");

const controllers = require("../../controller/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(controllers.getAll));

router.get("/:id", ctrlWrapper(controllers.getById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(controllers.add));

router.delete("/:id", ctrlWrapper(controllers.deleteContact));

router.put(
  "/:id",
  validateBody(schemas.addSchema),
  ctrlWrapper(controllers.updateById)
);

router.patch(
  "/:id/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(controllers.updateStatusContact)
);

module.exports = router;
