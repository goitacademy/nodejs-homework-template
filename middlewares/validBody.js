const HttpError = require("../helper/HttpError");
const {schemaFavoriteContact, schemaFullContact} =require("../service/schemas/contact")

const ValidFullContact = (req, res, next) => {
  const { body } = req;

  const value = schemaFullContact.validate(body)
  if (value.error) {
    next(HttpError(400, value.error ));
  }
  next();
};
const ValidFavorite = (req, res, next) => {
    const { body } = req;
  
    const value = schemaFavoriteContact.validate(body)
    if (value.error) {
      next(HttpError(400, value.error ));
    }
    next();
  };


const ValidBody ={
    ValidFullContact,
    ValidFavorite
}

module.exports = ValidBody;
