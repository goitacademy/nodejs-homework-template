const {isValidObjectId} = require('mongoose')
const {makeError} = require('../helpers')

const isValidId = (req, res , next) => {
    const {contactId} = req.params
    const result = isValidObjectId(contactId)
    if(!result){
        next(makeError(400, 'Id is not valid'))
    }
    next()
}

module.exports = isValidId