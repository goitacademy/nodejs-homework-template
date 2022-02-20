const validateBody = (schema) => async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body)
        next()
    }
    catch (err) { 
        return res
            .status(404)
            .json({ status: 'error', code: 404, message: err.message })
    }    
} 

module.exports = {validateBody}