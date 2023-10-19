const express = require("express");
const ctrl = require("../../controllers/auth");
const validateBody = require("../../middlewares/validateBody");
const { schemas } = require("../../models/Users");
// const { User } = require("../../models/Users");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");
// const fs = require('fs/promises');
// const path = require('path');


// const Jimp = require("jimp");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
// router.patch("/avatars",authenticate, upload.single('avatars'), async (req, res, next) => {
// try{
//   const { _id } = req.user;
//     const { path: tempUpload, originalname } = req.file;
//      const avatarDir = path.join(__dirname, "../", "../", "public", "avatars");
//   await Jimp.read(tempUpload).then((img) =>
//     img.resize(250, 250).write(`${tempUpload}`)
//   ); 
//   const fileName = `${_id}_${originalname}`;
// const resultUpload = path.join(avatarDir, fileName);
//   await fs.rename(tempUpload, resultUpload);

//   const avatarURL = path.join("avatars", fileName);
//  await User.findByIdAndUpdate(_id,  {avatarURL});

// //   if (!User) {
// //       throw HttpError(401, "Not authorized");
// //     }
//     res.json({ avatarURL });

//      } catch (error) {
//     next(error);
//   }
// });
// router.get("/current", authenticate, ctrl.currentUser);
// router.patch(
//   "/",
//   authenticate,
//   validateBody(schemas.updateBySubscriptionSchema),
//   ctrl.updateBySubscription,
// );
router.patch('/avatars', authenticate, upload.single('avatars'), ctrl.updateByAvatar);

module.exports = router;





