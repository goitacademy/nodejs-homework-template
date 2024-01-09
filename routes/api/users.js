const express = require("express"); // створюємо веб-сервер

const router = express.Router(); // створюємо router (це як записна книга, де по шляху можна побачити, що потрібно робити)

const ctrl = require("../../controllers/users");

const { validateBody, authenticate, upload } = require("../../middleswares");

const { schemas } = require("../../models/user");

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.registerUser);
router.get("/verify/:verificationToken", ctrl.verifyEmail);                              // для підтверження емейлу
router.post("/verify", validateBody(schemas.EmailSchema, ctrl.resendVerifyEmail));      // для повторного підтверження емейлу
router.post("/login",  validateBody(schemas.registerSchema),  ctrl.loginUser);
router.post("/logout", authenticate, ctrl.logoutUser);
router.get("/current", authenticate, ctrl.getCurrentUser);
router.patch("/:userId/subscription", authenticate, ctrl.updateUserSubscription);
// upload.fields([{name: "cover", maxCount:1}, {name: "subcover", maxCount:2}]) // очікуємо в двух полях файли (назва поля, максимальна кі-сть файлів)
// upload.array("avatar", 8); // очікуємо кілька файлів (до 8 шт) в полі avatar 
router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateUserAvatar);  // в полі avatar очікуємо один файл

module.exports = router;