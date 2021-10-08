const express = require("express");
const {
  JoiSchema,
  UpdateStatusContactJoiSchema,
} = require("../../models/contact/contact");
const { controllerWrapper, validation } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers/contacts");

const router = express.Router();

router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post("/", validation(JoiSchema), controllerWrapper(ctrl.addContact));

router.delete("/:contactId", controllerWrapper(ctrl.removeById));

router.put("/:contactId", validation(JoiSchema), controllerWrapper(ctrl.put));

router.path(
  "/:contactId/favorite",
  validation(UpdateStatusContactJoiSchema),
  controllerWrapper(ctrl.updateStatusContact)
);

module.exports = router;
