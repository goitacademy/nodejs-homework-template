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

const router = express.Router();

router.get("/", controllerWrapper(get));

router.get("/:contactId", controllerWrapper(getByID));

router.post("/", validateScheme(scheme), controllerWrapper(createNewContact));

router.delete("/:contactId", controllerWrapper(deleteContact));

router.put(
  "/:contactId",
  validateScheme(scheme),
  controllerWrapper(updateContact)
);

module.exports = router;
