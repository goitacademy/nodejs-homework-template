const express = require("express");
const {
  get,
  getByID,
  updateContact,
  deleteContact,
  createNewContact,
  updateStatusContact,
} = require("../../controllers/controllers.js");

const { controllerWrapper } = require("../../heplers");
const { scheme, validateScheme } = require("../../middlewares");
const isIdValid = require("../../heplers/idValidator.js");

const router = express.Router();

router.get("/", controllerWrapper(get));

router.get("/:contactId", isIdValid, controllerWrapper(getByID));

router.post(
  "/",
  isIdValid,
  validateScheme(scheme),
  controllerWrapper(createNewContact)
);

router.delete("/:contactId", isIdValid, controllerWrapper(deleteContact));

router.patch(
  "/:contactId/favorite",
  isIdValid,
  controllerWrapper(updateStatusContact)
);

router.put(
  "/:contactId",
  validateScheme(scheme),
  controllerWrapper(updateContact)
);

module.exports = router;
