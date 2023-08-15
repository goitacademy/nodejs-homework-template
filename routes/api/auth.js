const express=require('express')
const { ctrlWrapper } = require('../../helpers')
const {auth}=require('../../controllers')
const {validateBody, authentificate}=require('../../middleware')
const {schemas}=require('../../models/user')
const router=express.Router()

router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(auth.register))

router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(auth.login))

router.get('/logout', authentificate, ctrlWrapper(auth.logout))

router.get('/current', authentificate, ctrlWrapper(auth.current))

router.patch('/', authentificate, validateBody(schemas.updateSubscriptionSchema), ctrlWrapper(auth.updateSubscriptionUser))

module.exports=router