const {isValidObjectId} = require('mongoose')

const {HttpError} = require("../helpers")

const isValidId = (req, res, next) => {
  const {id} = req.params;
  const { body } = req;
  
  if (!body || body.favorite === undefined) {
    return res.status(400).json({ message: 'missing field favorite' });
  }
  
  if(!isValidObjectId(id)){
    next(HttpError(400, `${id} is not valid id`))
  }
  next()
}

module.exports = isValidId