const express = require("express");
const {
  get,
  getByID,
  updateContact,
  deleteContact,
  createNewContact,
} = require("../../controllers/controllers.js");

const { controllerWrapper } = require("../../heplers");
const { scheme, validateScheme } = require("../../middlewares");
const isIdValid = require("../../heplers/idValidator.js");

const router = express.Router();

router.get("/", controllerWrapper(get));

router.get("/:contactId", isIdValid, controllerWrapper(getByID));

router.post("/", validateScheme(scheme), controllerWrapper(createNewContact));

router.delete("/:contactId", controllerWrapper(deleteContact));

router.patch("/:contactId/favorite", controllerWrapper())
router.put(
  "/:contactId",
  validateScheme(scheme),
  controllerWrapper(updateContact)
);

module.exports = router;
