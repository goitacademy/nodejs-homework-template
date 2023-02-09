
const { register, login, logout, getCurrent, uploadAvatar} = require("../../controllers/auth-controller");
const { auth, upload } = require("../../middleware/index");
const express = require("express");
const { tryCatchWrapper } = require("../../helpers/helpers");
const router = express.Router();
const { validateBody } = require("../../middleware/index");
const { userSchema} = require("../../middleware/validate/schemas");

router.post("/register", validateBody(userSchema), tryCatchWrapper(register));
router.post("/login", validateBody(userSchema), tryCatchWrapper(login));
router.get("/logout",tryCatchWrapper(auth), tryCatchWrapper(logout));
router.get("/current",tryCatchWrapper(auth), tryCatchWrapper(getCurrent));
router.patch("/:id/avatar", upload.single("avatar"), tryCatchWrapper(uploadAvatar));

module.exports = router;