const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { validation } = require("../../middlewares");
const { schemas } = require("../../models");

const router = express.Router();
router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validation(schemas.joiSchema), ctrl.add);

router.put("/:contactId", validation(schemas.joiSchema), ctrl.update);

router.patch(
  "/:contactId/favorite",
  validation(schemas.favoriteJoiSchema),
  ctrl.update
);

router.delete("/:contactId", ctrl.remove);


module.exports = router;
