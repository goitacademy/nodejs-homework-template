const express = require("express");

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewars");
const { userRegisterSchema, userLoginSchema } = require("../../schemas/users");

const router = express.Router();

router.post(
  "/registration",
  validateBody(userRegisterSchema),
  ctrlWrapper(ctrl.registration)
);
router.post("/login", validateBody(userLoginSchema), ctrlWrapper(ctrl.login));
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));


module.exports = router;
