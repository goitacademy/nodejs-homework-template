const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { auth, validation } = require("../../middlewares");
const { schemas } = require("../../models");

const router = express.Router();
router.get("/", auth, ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", auth, validation(schemas.joiSchema), ctrl.add);

router.put("/:contactId", validation(schemas.joiSchema), ctrl.update);

router.patch(
  "/:contactId/favorite",
  validation(schemas.favoriteJoiSchema),
  ctrl.update
);

router.delete("/:contactId", ctrl.remove);


module.exports = router;
