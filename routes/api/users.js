const express = require("express");
const { validateContact } = require("../../middleware/validateContact");

const { schemas } = require("../../model/user");
const {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
} = require("../../controller/auth.controller");
const { contrWrapper } = require("../../helper/contrWrapper");
const { authMiddleware } = require("../../middleware/auth");

const router = express.Router();

router.post("/register", validateContact(schemas.registerSchema), (req, res) =>
  contrWrapper(register)(req, res)
);

router.post(
  "/login",
  validateContact(schemas.loginSchema),
  contrWrapper(login)
);
router.post("/logout", authMiddleware, contrWrapper(logout));
router.get("/current", authMiddleware, contrWrapper(getCurrent));
router.patch("/updateSubscription", authMiddleware, updateSubscription);
router.patch("/avatars");
module.exports = router;
