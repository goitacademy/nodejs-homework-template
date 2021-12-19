const express = require("express");
const router = express.Router();
const { controllerWrapper, validation } = require("../../middlewares");
const { joiSchema, updateStatusSchema } = require("../../schemas/contact");
const { contacts: ctrl } = require("../../controllers");

router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:id", controllerWrapper(ctrl.getById));

router.post("/", validation(joiSchema), controllerWrapper(ctrl.add));

router.put("/:id", validation(joiSchema), controllerWrapper(ctrl.updateById));

router.delete("/:id", controllerWrapper(ctrl.removeById));

router.patch(
  "/:id/favorite",
  validation(updateStatusSchema),
  controllerWrapper(ctrl.updateContactStatus)
);

module.exports = router;
