const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../middlewares");
const {
  validationBody,
  validationParams,
} = require("../../middlewares/validation");
const { schemas } = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.getListContacts));

router.get(
  "/:id",
  validationParams(schemas.verifyMongoId),
  ctrlWrapper(ctrl.getContactById)
);

router.post("/", validationBody(schemas.add), ctrlWrapper(ctrl.addContact));

router.put(
  "/:id",
  validationParams(schemas.verifyMongoId),
  validationBody(schemas.add),
  ctrlWrapper(ctrl.updateContactById)
);

router.patch(
  "/:id/favorite",
  validationParams(schemas.verifyMongoId),
  validationBody(schemas.updateStatus),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete(
  "/:id",
  validationParams(schemas.verifyMongoId),
  ctrlWrapper(ctrl.removeContactById)
);

module.exports = router;
