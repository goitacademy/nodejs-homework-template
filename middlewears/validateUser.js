const {body,validationResult } =  require('express-validator')
const createError = require('../untils/createError')
const ERROR_TYPES = require('../adapters/express/contastants/errorTypes')
const regExpUser = require('../constants/regExp')
const validateUser = async (req,res,next) => {
    try{
    const {password,email} = req.body
    if(regExpUser.email.test(email) && regExpUser.password.test(password)){
        next()
    }else{
        const error = createError(ERROR_TYPES.BAD_REQUEST,{
            message:'Validate error'
        })
        throw error
    }}catch(e){
       next(e)
    }
}

module.exports = validateUser