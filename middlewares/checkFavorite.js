const HttpError = require('../helpers');

const chekFavorite = (req, res, next) =>{
    const { favorite } = req.body;
  
    if (favorite === undefined) {
      throw HttpError(400, 'missing field favorite');
    }
    next();
  }
  module.exports =  chekFavorite;