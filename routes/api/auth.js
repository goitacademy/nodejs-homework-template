const express = require('express')



const ctrl = require('../../controllers/auth')
const { schemas } = require('../../models/user')

const {validateBody} = require("../../middlewares/Validation")

const router = express.Router()


router.post('/register', validateBody(schemas.registerSchema), ctrl.register)


router.post('/login', (req, res) => {

})




module.exports = router