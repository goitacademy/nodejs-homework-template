const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const {
  validateBody,
  upload,
  resizeAvatar,
} = require("../../middlewares/index");
const { createUserSchema } = require("../../schemas/auth");
const controller = require("../../controllers/user");
const auth = require("../../middlewares/auth");

const router = express.Router();
router.post(
  "/register",
  validateBody(createUserSchema),
  tryCatchWrapper(controller.register)
);
router.get("/login", tryCatchWrapper(controller.login));
router.get(
  "/logout",
  tryCatchWrapper(auth),
  tryCatchWrapper(controller.logout)
);
router.post("/", tryCatchWrapper(auth), tryCatchWrapper(controller.addContact));
router.get(
  "/contacts",
  tryCatchWrapper(auth),
  tryCatchWrapper(controller.getContacts)
);
router.get("/info", tryCatchWrapper(auth), tryCatchWrapper(controller.getInfo));
router.get(
  "/current",
  tryCatchWrapper(auth),
  tryCatchWrapper(controller.current)
);
router.patch(
  "/avatar",
  upload.single("avatar"),
  tryCatchWrapper(resizeAvatar),
  tryCatchWrapper(auth),
  tryCatchWrapper(controller.uploadAvatar)
);
router.get("/verify/:token", tryCatchWrapper(controller.verifyEmail));
router.post("/verify", tryCatchWrapper(controller.sendVerify));

module.exports = router;
