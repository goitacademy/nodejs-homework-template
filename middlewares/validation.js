const validation = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body) 
    next()
  } catch (err) { 
      return res.status(400)
      .json({status: 'error', code: 400, massage: err.message})
  }  
}

const validationParams = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.params) 
    next()
  } catch (err) { 
      return res.status(400)
      .json({status: 'error', code: 404, massage: 'Not found'})
  }  
}

const validationFavorite = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body) 
    next()
  } catch (err) { 
      return res.status(400)
      .json({status: 'error', code: 400, massage: 'missing field favorite'})
  }  
}
module.exports = {validation, validationParams, validationFavorite}