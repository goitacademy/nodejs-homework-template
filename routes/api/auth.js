const express = require('express');

 

const { basedir } = global;

const ctrl = require(`${basedir}/controllers/auth`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const { auth, upload } = require(`${basedir}/middlewares`);

const router = express.Router();

 //signup
router.post('/register', ctrlWrapper(ctrl.register));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));//verifyEmail створюемо в controllers/auth/verifyEmail-controller

//Додаемо новий маршрут для того щоб користувач який зареєструвався але не пройшов веріфікацію міг знову це зробить тобто ему надаеться знов можливість на запит email, password

router.post('/verify', ctrlWrapper(ctrl.resendVerifyEmail));//в controllers/auth - створюємо controller - resendVerifyEmail

//signin
router.post('/login', ctrlWrapper(ctrl.login));

//get.current
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

 
router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.patch("/avatar", auth, upload.single("avatar"), ctrlWrapper(ctrl.setAvatar));

module.exports = router;