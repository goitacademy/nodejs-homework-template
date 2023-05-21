const {isValidObjectId}= require('mongoose');
const HttpError = require("../helper/HttpError");

const isValidId =(req, res, next)=>{

    const {id}= req.params

    if(!isValidObjectId(id)){
          return  next(HttpError(400, ` ${id} is not valid Invalid id`))
        }
next()
}

module.exports = isValidId