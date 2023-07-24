const express = require("express")
const { validateBody, authenticate, filesUploader } = require('../../middlewares')
const { signUserSchema, updateSubscriptionSchema } = require('../../models/joiSchemas')
const ctrl = require('../../controllers/users')
const router = express.Router()

// sign up
router.post("/register", validateBody(signUserSchema), ctrl.register)
// sign in
router.post("/login", validateBody(signUserSchema), ctrl.login)
// log out
router.post("/logout", authenticate, ctrl.logout);
// current user
router.get("/current", authenticate, ctrl.getCurrent);
// Subscription renewal
router.patch("/", authenticate, validateBody(updateSubscriptionSchema), ctrl.renewalSubscription)

// router.post(
//     "/avatars",
//     filesUploader.single("avatar"),
//     async (req,res) => {
//         console.log(req.body);
//         console.log(req.file)
//     }
// )


module.exports = router;