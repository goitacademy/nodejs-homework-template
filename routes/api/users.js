const express = require("express");

const { usersControllers: ctrl } = require("../../controllers");

const {
  authentication,
  upload,
  controllerWrapper,
} = require("../../middlewares");

const router = express.Router();

router.get("/verify/:verifyToken", controllerWrapper(ctrl.verify));

router.post("/", controllerWrapper(ctrl.repeatEmail));

router.get(
  "/current",
  controllerWrapper(authentication),
  controllerWrapper(ctrl.current)
);

router.patch(
  "/:id",
  controllerWrapper(authentication),
  upload.single("image"),
  controllerWrapper(ctrl.updateImg)
);

module.exports = router;
