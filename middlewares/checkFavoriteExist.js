const checkFavoriteExist = (req, res, next) => {
    if (req.query.favorite === 'true') {
      req.query.favorite = true;
    }
    next(); 
  }

module.exports = checkFavoriteExist;