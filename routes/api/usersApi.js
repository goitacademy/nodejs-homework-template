const express = require("express");
const router = express.Router();
const ctrlUser = require("../../controller/usersController");
const authorization = require("../../tools/authorization");

const path = require("path");
const multer = require("multer");
const uploadDir = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadDir);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

router.post("/signup", ctrlUser.signUp);
router.post("/login", ctrlUser.logIn);
router.get("/logout", authorization, ctrlUser.logOut);
router.get("/current", authorization, ctrlUser.current);
router.patch(
  "/avatars",
  authorization,
  upload.single("avatar"),
  ctrlUser.avatar
);

module.exports = router;
