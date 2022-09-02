const {RequestError} = require('../helpers')

const validationContacts = schema => {
    const func = async (req, _, next) => {
        const {error} = await schema.validate(req.body)
        if(error){
            next(RequestError(400, error.message))
        }
        next()
    }
    return func
}

module.exports = validationContacts