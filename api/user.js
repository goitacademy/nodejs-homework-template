const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
// const fs = require("fs").promises;
const uploadDir = path.join(process.cwd(), "public", "avatars");

const {
	signUpUser,
	loginUser,
	logoutUser,
	getCurrentUser,
	auth,
} = require("../controller/user");

router.post("/signup", signUpUser);

router.post("/login", loginUser);

router.post("/logout", auth, logoutUser);

router.get("/current", auth, getCurrentUser);

// //multer
// const storage = multer.diskStorage({
// 	destination: uploadDir,
// 	filename: (req, file, cb) => {
// 		cb(null, file.originalname);
// 	},
// 	limits: {
// 		fileSize: 1048576,
// 	},
// });

// const upload = multer({
// 	storage: storage,
// });

// upload.single("photo");
// console.log(storage);

// router.get("/avatars", upload.single("photo"), (req, res) => {
// 	res.status(200).json({ message: "plik załadowany" });
// });

module.exports = router;
