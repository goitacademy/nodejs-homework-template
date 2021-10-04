const express = require("express");
const { controllerWrapper } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");

const {
  validationAddedContact,
  validationUpdatedContact,
} = require("../../middlewares/validation");

const router = express.Router();

router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post("/", validationAddedContact, controllerWrapper(ctrl.post));

router.delete("/:contactId", controllerWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validationUpdatedContact,
  controllerWrapper(ctrl.put)
);

module.exports = router;
