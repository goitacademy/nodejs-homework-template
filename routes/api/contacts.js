const express = require("express");
const router = express.Router();
const { ctrl } = require("../../controllers");
const { validation, controllerWrap } = require("../../middlewares");
const { joiContactSchema } = require("../../validations");

router.get("/", controllerWrap(ctrl.getAllContacts));

router.get("/:id", controllerWrap(ctrl.getContact));

router.post("/", validation(joiContactSchema), controllerWrap(ctrl.addContact));

router.put(
  "/:id",
  validation(joiContactSchema),
  controllerWrap(ctrl.updateContact)
);

router.delete("/:id", controllerWrap(ctrl.removeContact));

module.exports = router;
