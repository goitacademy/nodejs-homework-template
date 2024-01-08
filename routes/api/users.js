const express = require('express');
const router = express.Router();
const { userMiddleware, checkToken, logoutMiddleware, currentUser } = require('../../middlewares/userMiddlewares');
const { loginMiddleware, uploadUserAvatar, updateUser } = require('../../middlewares/userMiddlewares');

// router.use(checkToken)

router.post('/register', userMiddleware)
router.post('/login', loginMiddleware)
router.post('/logout', checkToken, logoutMiddleware)
router.get('/current', checkToken, currentUser)
router.patch('/avatars', checkToken, uploadUserAvatar, updateUser)
module.exports = router
   