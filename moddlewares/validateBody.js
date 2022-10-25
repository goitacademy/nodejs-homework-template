const {makeError} = require('../helpers')



const validateBody = schema => {
    const func = async(req,res,next) => {
        const {error} = schema.validate(req.body)
        if(error){
            const valError = makeError(400, error.message)
            next(valError)
        }
        next()
    }
    return func;
}

module.exports = validateBody