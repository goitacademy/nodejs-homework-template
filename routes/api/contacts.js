const express = require("express");
const router = express.Router();
const { contacts: controllers } = require("../../controllers");
const { joiSchema, favJoiSchema } = require("../../models/contact");
const validation = require("../../middlewares/validation");

const validateMiddleware = validation(joiSchema);

router.get("/", controllers.getAll);

router.get("/:id", controllers.getById);

router.post("/", validateMiddleware, controllers.add);

router.put("/:id", validateMiddleware, controllers.updateById);

router.patch(
  "/:id/favourite",
  validation(favJoiSchema),
  controllers.updateFavourite
);

router.delete("/:id", controllers.removeById);

module.exports = router;
