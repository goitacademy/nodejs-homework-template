const validateBody = (schema) => async (req, res, next) => {
   try {
       await schema.validateAsync(req.body);
       next()
}
   catch (err) {
       return res.status(400).json({status: 'error', code: 400, message: err.message})
 } 
}

const validateParams = (schema) => async (req, res, next) => {
   try {
       await schema.validateAsync(req.params);
       next()
}
   catch (err) {
       return res.status(400).json({status: 'error', code: 400, message: err.message})
 } 
}

const validateUpdateFavorite = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === "object.missing") {
      return res.status(400).json({ message: "missing field favorite" });
    }
    return res.status(400).json({ message: err.message.replace(/"/g, "") });
  }
  next()
}

module.exports = {validateBody, validateParams, validateUpdateFavorite}