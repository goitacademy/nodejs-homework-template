const express = require("express");
const router = express.Router();
const { joiContactSchema } = require("../../models/contact");
const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");
const ctrl = require("../../controllers/contacts");

const validationMiddleware = validation(joiContactSchema);

router.get(
  "/",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.getListContacts)
);

router.get(
  "/:contactId",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.getContactById)
);

router.post(
  "/",
  controllerWrapper(authenticate),
  validationMiddleware,
  controllerWrapper(ctrl.addContact)
);

router.delete(
  "/:contactId",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.removeContact)
);

router.put(
  "/:contactId",
  controllerWrapper(authenticate),
  validationMiddleware,
  controllerWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.updateFavorite)
);

module.exports = router;
