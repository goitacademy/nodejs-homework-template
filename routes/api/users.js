const express = require('express');
const router = express.Router();
const usersController = require('../../controller/users');
const { auth } = require("../../controller/auth");
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
     cb(null, path.resolve('./tmp'))
    },
    filename: (req, file, cb) => {
        const [, extension] = file.originalname.split('.')
        cb(null, `${uuidv4()}.${extension}`)
       }
})

const uploadMiddleware = multer({storage})

router.post('/signup', (req, res) => usersController.addUserController(req.body, res)) 

router.post('/login', (req,res) => usersController.findUserController(req.body, res))

router.get('/', auth, (req, res) => usersController.getAllUsersController(req, res))

router.get('/logout', auth, (req, res) => usersController.logoutUsersController(req,res))

router.get('/current', auth, (req,res) => usersController.getCurrentUserController(req,res))

router.patch('/', auth, (req,res) => usersController.patchUserSubscription(req,res))

router.patch('/avatars', [auth, uploadMiddleware.single('avatar')], (req,res) => usersController.patchUserAvatarController(req,res))


module.exports = router