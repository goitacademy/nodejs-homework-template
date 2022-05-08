const express = require("express");
const router = express.Router();
const controller = require("../../controller/index");
const {
  joiSchema,
  joiSchemaFavorite,
  joiSchemaPut,
} = require("../../service/shemas/contact");
const {
  validationAdd,
  validationPatch,
} = require("../../service/validations/validations");
router.get("/", controller.getController);

router.get("/:contactId", controller.getByIdController);

router.post("/", validationAdd(joiSchema), controller.addController);
router.put(
  "/:contactId",
  validationAdd(joiSchemaPut),
  controller.putController
);
router.patch(
  "/:contactId/favorite",
  validationPatch(joiSchemaFavorite),
  controller.favoriteController
);
router.delete("/:contactId", controller.deleteController);

module.exports = router;
