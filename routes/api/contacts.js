const express = require("express");
const router = express.Router();
const { ctrl } = require("../../controllers");
const { validation, controllerWrap } = require("../../middlewares");
const { joiSchema } = require("../../model/contact");

router.get("/", controllerWrap(ctrl.getAllContacts));

router.get("/:id", controllerWrap(ctrl.getContact));

router.post("/", validation(joiSchema), controllerWrap(ctrl.addContact));

router.put("/:id", validation(joiSchema), controllerWrap(ctrl.updateContact));

router.patch(
  "/:id/favorite",
  validation(joiSchema),
  controllerWrap(ctrl.updateStatusContact)
);

router.delete("/:id", controllerWrap(ctrl.removeContact));

module.exports = router;
