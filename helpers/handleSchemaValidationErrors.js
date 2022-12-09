const isConflict = ({ name, code }) => (name === "MongoServerError" && code === 11000)

const handleSchemaValidationErrors = (err, data, next) => {
    err.status = isConflict(err) ? 409 : 400
    next()
}

module.exports = handleSchemaValidationErrors