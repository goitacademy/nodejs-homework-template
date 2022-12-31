const express = require('express')
const router = express.Router()

const { controllerWrapper, authMiddleware } = require("../../middlewares")

const { usersControllers: ctrl } = require("../../controllers")



//----------------------------------------------------------------------------
//! 0. Проверка токена
router.use(authMiddleware);


//! 1. Текущий пользователь - получить данные юзера по токену
router.get("/", controllerWrapper(ctrl.getCurrentController))




// module.exports = { authRouter: router }
module.exports = router
