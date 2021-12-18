/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const { controllerWrapper, validation } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:id", controllerWrapper(ctrl.getById));

router.post("/", validation(contactSchema), controllerWrapper(ctrl.add));

router.put(
  "/:id",
  validation(contactSchema),
  controllerWrapper(ctrl.updateById)
);

router.delete("/:id", controllerWrapper(ctrl.removeById));

module.exports = router;
