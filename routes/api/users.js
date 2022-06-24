const express = require("express");

const router = express.Router();

// const multer = require("multer");
const path = require("path");
// const fs = require("fs/promises");
// const avatarDir = path.join(__dirname, "../../temp");


const usersDir = path.join(__dirname, "../../public/avatars");
console.log(usersDir);
// const multerConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, avatarDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
//   limits: {
//     fileSize: 2048,
//   },
// });
// const upload = multer({
//   storage: multerConfig,
// });

const { validation, auth, upload } = require("../../middlewars");
const { users: controllers } = require("../../controllers");
const {
  joiSignupSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
} = require("../../models/user");
router.post("/signup", validation(joiSignupSchema), controllers.signup);
router.post("/login", validation(joiLoginSchema), controllers.login);
router.get("/current", auth, controllers.currentUser);
router.post("/logout", auth, controllers.logout);
router.patch(
  "/",
  auth,
  validation(joiSubscriptionSchema),
  controllers.updateSubscription
);
router.patch("/avatars",auth, upload.single("avatar"), controllers.updateAvatar )
// router.post("/", upload.single("image"), async (req, res, next) => {
//   const { path: tempUpload, originalname } = req.file;
//   const resultUpload = path.join(usersDir, originalname);

//   try {
//     await fs.rename(tempUpload, resultUpload);
//     const image = path.join("public", "avatars", originalname);
//     const newContact = {
//       name: req.body.name,
//       id: v4(),
//       image,
//     };
//     users.push(newContact);
//     res.status(201).json(newContact);
//   } catch (error) {
//     // await fs.unlink(tempUpload);
//     next(error);
//   }
// });


module.exports = router;
