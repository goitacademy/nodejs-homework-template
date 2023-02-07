const express = require('express');
const router = express.Router();
const usersController = require('../../controller/users');
const { auth } = require("../../controller/auth");

router.post('/signup', (req, res) => usersController.addUserController(req.body, res)) 

router.post('/login', (req,res) => usersController.findUserController(req.body, res))

router.get('/', auth, (req, res) => usersController.getAllUsersController(req, res))

router.get('/logout', auth, (req, res) => usersController.logoutUsersController(req,res))

router.get('/current', auth, (req,res) => usersController.getCurrentUserController(req,res))

router.patch('/', auth, (req,res) => usersController.patchUserSubscription(req,res))


module.exports = router