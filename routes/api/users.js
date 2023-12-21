const express = require("express"); // створюємо веб-сервер

const router = express.Router(); // створюємо router (це як записна книга, де по шляху можна побачити, що потрібно робити)

const ctrl = require("../../controllers/users");

const { validateBody, isValidId } = require("../../middleswares");

const { schemas } = require("../../models/user");

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.registerUser);

module.exports = router;