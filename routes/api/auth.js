const express = require("express");
const ctrl = require("../../controllers/users");
const router = express.Router();
const { auth, upload } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { schemas, User } = require("../../models/user");
const { validation } = require("../../middlewares");

const fs = require("fs/promises");
const path = require("path");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

router.post("/singup", validation(schemas.singup), ctrlWrapper(ctrl.singup));
router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrl.getCurrent);
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const { _id: id } = req.user;
      const { originalname, path: tempUpload } = req.file;
      const [extension] = originalname.split(".").reverse();
      const fileName = `${id}.${extension}`;
      const resultUpload = path.join(avatarsDir, fileName);
      await fs.rename(tempUpload, resultUpload);
      const avatarURL = path.join("avatars", fileName);
      await User.findByIdAndUpdate(id, { avatarURL });
      res.json({
        avatarURL,
      });
    } catch (error) {
      await fs.unlink(req.file.path);
      next(error);
    }
  }
);
module.exports = router;
