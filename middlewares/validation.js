const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body)
        next()
        }    
    catch(err) {
        return res.status(404).json({status: 'error', code: 404, message: err.message})
    }
}

module.exports= {validate}
