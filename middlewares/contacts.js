const HttpError = require('../error/errorHandler');
const joiStatus = require('../validations/joiStatus');
const contactController = require('../controller/contactController');
const { isValidObjectId } = require("mongoose");

const validateBody = (schema) => {
    const func = (req, _, next) => {
      const { body } = req;
      const { error } = schema.validate(body);
      const filledBody = Object.keys(body).length;
  
      if (!filledBody) {
        next(HttpError(400, "missing  fields"));
      } else if (error) {
        next(
            HttpError(
            400,
            `missing required ${error.message.slice(
              1,
              error.message.lastIndexOf('"')
            )} field`
          )
        );
      }
      next(error);
    };
    return func;
};


const validateID = async (req,res,next)=>{
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) next(HttpError(400, "id no valid"));

  console.log(isValidObjectId(contactId))

  const contact = await contactController.getById(contactId);
  if (!contact) next(HttpError(404, "Not found"));
  
  req.data = contact;
  next();
}

const validateFavorite = (req,res,next) =>{
    if(!Object.keys(req.body).length){
        return next(HttpError(400,"missing field favorite"));
    }
   
    const {error} = joiStatus.validate(req.body);
    if(error) return next(HttpError(400,error.message));
    next();
}


module.exports = {validateBody,validateID,validateFavorite};
