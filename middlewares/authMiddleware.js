const HTTP = require("../helpers/status");
const TokenService = require("../services/tokenService");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.header.authorization;
    if(!authorizationHeader){
      return next({
        status: HTTP.UNAUTHORIZED,
        message: "Not Found",
        data: 'Not Found'
      })
    }
    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
       return next({
        status: HTTP.UNAUTHORIZED,
        message: "Not Found",
        data: 'Not Found'
      })
    }

    const userData = TokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next({
        status: HTTP.UNAUTHORIZED,
        message: "Not Found",
        data: 'Not Found'
      })
    }
    req.user = userData;
    next()
  } catch (e) {
    return next({
        status: HTTP.UNAUTHORIZED,
        message: "Not Found",
        data: 'Not Found'
      })
  }
}