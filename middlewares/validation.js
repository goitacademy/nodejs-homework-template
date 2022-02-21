const validation = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body)
        next()
    } catch (error) {
        console.log(error.details)
        return res
            .status(400)
            .json({ status: 'error', code: 400, message: error.message })
    }
}

module.exports = validation