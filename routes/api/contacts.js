const express = require("express");
const router = express.Router();

const { contactsControllers: ctrl } = require("../../controllers");

const {
  joiSchemaAddContact,
  joiSchemaUpdateContact,
} = require("../../models/contact");

const {
  controllerWrapper,
  validation,
  authentication,
} = require("../../middlewares");

router.get(
  "/",
  controllerWrapper(authentication),
  controllerWrapper(ctrl.getAll)
);

router.get(
  "/:contactId",
  controllerWrapper(authentication),
  controllerWrapper(ctrl.getById)
);

router.post(
  "/",
  controllerWrapper(authentication),
  validation(joiSchemaAddContact),
  controllerWrapper(ctrl.add)
);

router.delete(
  "/:contactId",
  controllerWrapper(authentication),
  controllerWrapper(ctrl.del)
);

router.put(
  "/:id",
  controllerWrapper(authentication),
  validation(joiSchemaUpdateContact),
  controllerWrapper(ctrl.update)
);

router.patch(
  "/:contactId/favorite",
  controllerWrapper(authentication),
  validation(joiSchemaUpdateContact),
  controllerWrapper(ctrl.updateFavorite)
);

module.exports = router;
