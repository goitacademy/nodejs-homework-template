const express = require("express");
const {
  signUpUser,
  logInUser,
  logOutUser,
  getCurrentUser,
  updateUserSubscription,
  changeUseravatar,
} = require("../../controller/usersController");

const {
  userValidationSchema,
  userSubscriptionSchema,
} = require("../../models/usersSchema");
const { validation } = require("../../middlewares/validation");
const { authMW } = require("../../middlewares/authMW");
const { upload } = require("../../helpers/uplodeAvatar");
// const multer = require("multer");
// const path = require("path");

// const uploadDir = path.resolve("./temp");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
//   limits: {
//     fileSize: 1048576,
//   },
// });

// const upload = multer({
//   storage: storage,
// });

const router = express.Router();

router.post("/signup", validation(userValidationSchema), signUpUser);

router.post("/login", validation(userValidationSchema), logInUser);

router.get("/logout", authMW, logOutUser);

router.get("/current", authMW, getCurrentUser);

router.patch("/avatars", authMW, upload.single("avatar"), changeUseravatar);

router.patch(
  "/",
  authMW,
  validation(userSubscriptionSchema),
  updateUserSubscription
);

module.exports = router;
