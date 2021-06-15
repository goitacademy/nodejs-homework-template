const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/users");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload"); // Движок дискового пространства. Дает полный контроль над размещением файлов на диск.

router.post("/signup", controller.signup);

router.post("/login", controller.login);

router.post("/logout", guard, controller.logout);

router.get("/current", guard, controller.currentUser);

router.patch("/subscription", guard, controller.update);

router.patch("/avatars", guard, upload.single("avatar"), controller.avatars);
// upload.single - middleware, которая будет пробрасывать в controller сам файл, который принимает имя поля "avatar", в котором лежит картинка

module.exports = router;
