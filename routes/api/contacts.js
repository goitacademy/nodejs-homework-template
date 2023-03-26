const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const {
  auth,
  ctrlWrapper,
} = require("../../middlewares");
const {
  validationBody,
  validationParams,
} = require("../../middlewares/validation");

const { schemas } = require("../../models/contact");

router.get("/", auth, ctrlWrapper(ctrl.getListContacts));

router.get(
  "/:id",
  auth,
  validationParams(schemas.verifyMongoId),
  ctrlWrapper(ctrl.getContactById)
);

router.post(
  "/",
  auth,
  validationBody(schemas.add),
  ctrlWrapper(ctrl.addContact)
);

router.put(
  "/:id",
  auth,
  validationParams(schemas.verifyMongoId),
  validationBody(schemas.add),
  ctrlWrapper(ctrl.updateContactById)
);

router.patch(
  "/:id/favorite",
  auth,
  validationParams(schemas.verifyMongoId),
  validationBody(schemas.updateStatus),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete(
  "/:id",
  auth,
  validationParams(schemas.verifyMongoId),
  ctrlWrapper(ctrl.removeContactById)
);

module.exports = router;