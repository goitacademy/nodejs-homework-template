const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const ctrlTask = require("../../controller/users.js");
const { auth } = require("../../controller/tokenAuth.js");

const tmpDir = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Math.round(Math.random() * 1e9) + ext);
  },
});

const upload = multer({ storage });

router.post("/signup", ctrlTask.register);

router.post("/login", ctrlTask.login);

router.get("/logout", auth, ctrlTask.logout);

router.get("/current", auth, ctrlTask.current);

router.patch("/subscription", auth, ctrlTask.subscription);

router.patch("/avatars", auth, upload.single("avatar"), ctrlTask.avatar);

module.exports = router;
