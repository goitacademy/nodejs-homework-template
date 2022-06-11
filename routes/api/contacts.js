const express = require("express");
const router = express.Router();
const controller = require("../../controller/contacts");
const {
  joiSchema,
  joiSchemaFavorite,
  joiSchemaPut,
} = require("../../service/shemas/contact");
const { auth } = require("../../middlewares/auth");
const {
  validationAdd,
  validationPatch,
} = require("../../service/validations/validations");
router.get("/", auth, controller.getController);

router.get("/:contactId", auth, controller.getByIdController);

router.post("/", auth, validationAdd(joiSchema), controller.addController);
router.put(
  "/:contactId",
  auth,
  validationAdd(joiSchemaPut),
  controller.putController
);
router.patch(
  "/:contactId/favorite",
  auth,
  validationPatch(joiSchemaFavorite),
  controller.favoriteController
);
router.delete("/:contactId", auth, controller.deleteController);

module.exports = router;
