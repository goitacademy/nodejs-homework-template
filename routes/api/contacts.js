const express = require("express");
const {
  JoiSchema,
  UpdateStatusContactJoiSchema,
} = require("../../models/contact");
const { controllerWrapper, validation } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post("/", validation(JoiSchema), controllerWrapper(ctrl.add));

router.delete("/:contactId", controllerWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validation(JoiSchema),
  controllerWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  validation(UpdateStatusContactJoiSchema),
  controllerWrapper(ctrl.updateStatusContact)
);

module.exports = router;
