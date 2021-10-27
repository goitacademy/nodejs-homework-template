const express = require("express")
const router = express.Router()
const functions = require("../../model/auth")
const middlewares = require("../../middlewares/auth")

const multer = require("multer")
const path = require("path")
const tempDir = path.join(process.cwd(), "tmp")
// console.log(tempDir)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 10000,
  },
})

const upload = multer({ storage: storage })
// const services = require("../../services/user")

router.post("/register", middlewares.joiMiddleware, functions.register)

router.post("/login", middlewares.joiMiddleware, functions.login)

router.post("/logout", middlewares.auth, functions.logout)

router.get("/current", middlewares.auth, functions.current)

router.patch("/", middlewares.updateSubscriptionMiddleware)

router.patch("/avatars", middlewares.auth, upload.single("avatar"), functions.updateAvatar)

router.get("/verify/:verifyToken", functions.verifyUserToken)

router.post("/verify", functions.repeatVerify)

module.exports = router
