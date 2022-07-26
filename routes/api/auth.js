const express = require('express');
const ctrl = require('../../controllers/auth');
const {ctrlWrapper}=require('../../helpers');

const router=express.Router();


router.post('/signup', ctrlWrapper(ctrl.signup));


router.post('/login', ctrlWrapper(ctrl.login));


router.get('/logout', ctrlWrapper(ctrl.logout));

module.exports=router;