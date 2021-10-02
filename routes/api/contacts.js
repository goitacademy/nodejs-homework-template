const express = require("express");
const { controllerWrapper } = require("../../middlewares/index");
const { contacts: ctrl } = require("../../controllers");
const {
  validationAddedContact,
  validationUpdatedContact,
} = require("./validation");
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
