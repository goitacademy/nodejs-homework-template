const {ErrorPages} = require('./ErrorPage')

const schemaWrapper = schema => {
    const data = (req, _, next) => {
        const {error} = schema.validate(req.body.body)
        if(error) {
            next(ErrorPages(400, error))
        }
        next()
    }
    return data
}

module.exports = schemaWrapper