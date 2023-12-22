const express = require("express"); // створюємо веб-сервер

const router = express.Router(); // створюємо router (це як записна книга, де по шляху можна побачити, що потрібно робити)

const ctrl = require("../../controllers/users");

const { validateBody, authenticate } = require("../../middleswares");

const { schemas } = require("../../models/user");

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.registerUser);
router.post("/login",  validateBody(schemas.registerSchema),  ctrl.loginUser);
router.post("/logout", authenticate, ctrl.logoutUser);
router.get("/current", authenticate, ctrl.getCurrentUser);
// router.patch("/:userId/subscription", authenticate, ctrl.updateUserSubscription); // дороблю на вихідних

module.exports = router;