const { AppError, catchAsync } = require('../../utils');

const checkFavoriteContactData = catchAsync (async (req, res, next) => {
    if (!Object.keys(req.body).includes('favorite')) 
      return next(new AppError(400, 'missing field favorite'));
  
      next();
  });

  module.exports = checkFavoriteContactData;