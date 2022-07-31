const express = require('express');
const ctrl = require('../../controllers/auth');
const {auth} = require('../../middlewares');
const {ctrlWrapper}=require('../../helpers');
const router=express.Router();

router.post('/signup', ctrlWrapper(ctrl.signup));

router.post('/login', ctrlWrapper(ctrl.login));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

module.exports=router;