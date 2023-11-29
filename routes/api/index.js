const express = require('express');
const router = express.Router();

const userToken = require("../../middlewares/userToken"); 

const usersRouter = require('./users');  
const contactsRouter = require('./contacts')  

router.use('/users', userToken,  usersRouter);
router.use('/contacts', contactsRouter);

module.exports = router;
