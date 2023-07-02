const HttpError = require('../error/errorHandler');
const joiConfig = require('../joiconfig');
const { getContactById } = require('../models/contacts');
const joiStatus = require('../joiStatus');


const validateBody = (req,res,next) =>{
    if(!Object.keys(req.body).length){
        return next(HttpError(400,"missing fields"));
    }
    const bodyWithoutKey = [];
    if (!Object.keys(req.body).includes("name")) bodyWithoutKey.push("name");
    if (!Object.keys(req.body).includes("email")) bodyWithoutKey.push("email");
    if (!Object.keys(req.body).includes("phone")) bodyWithoutKey.push("phone");

    if(bodyWithoutKey.length){
        return next(HttpError(400,`missing field${bodyWithoutKey.length > 1 ? "s" : ""}: ${bodyWithoutKey}`))
    }
    const {error} = joiConfig.validate(req.body);
    if(error) return next(HttpError(400,error.message));
    next();
}

const validateID = async (req,res,next)=>{
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) next(HttpError(404, "Not found"));
  req.data = contact;
  next();
}

const validateFavorite = (req,res,next) =>{
    if(!Object.keys(req.body).length){
        return next(HttpError(400,"missing fields"));
    }
    const bodyWithoutKey = [];
    if (!Object.keys(req.body).includes("favorite")) bodyWithoutKey.push("favorite");

    if(bodyWithoutKey.length){
        return next(HttpError(400,`missing field${bodyWithoutKey.length > 1 ? "s" : ""}: ${bodyWithoutKey}`))
    }
    console.log("VALIDATOR",req.body,req.params.contactId)
    const {error} = joiStatus.validate(req.body);
    if(error) return next(HttpError(400,error.message));
    next();
}


module.exports = {validateBody,validateID,validateFavorite};
