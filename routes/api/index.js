// routes\api\index.js

const express = require('express');
const router = express.Router();

const userToken = require("../../middlewares/userToken"); // это нам нужно?

const usersRouter = require('./users');  
const contactsRouter = require('./contacts')  // добавил папку маршрутизации

router.use('/users', userToken,  usersRouter);
router.use('/contacts', contactsRouter);

module.exports = router;
