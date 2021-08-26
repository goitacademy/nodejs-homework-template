const HTTP = require("../helpers/status");
const TokenService = require("../services/tokenService");

module.exports = async function (req, res, next) {
  try {
    // console.log(req);
    const authorizationHeader = req.headers.authorization;
    // console.log('authorizationHeader', authorizationHeader);
    if(!authorizationHeader){
      return next({
        status: HTTP.UNAUTHORIZED,
        message: "Not Found",
        data: 'Not Found'
      })
    }
    const accessToken = authorizationHeader.split(' ')[1]
    // console.log('ACCCCEESSSS', accessToken);
    if (!accessToken) {
       return next({
        status: HTTP.UNAUTHORIZED,
        message: "Not Found",
        data: 'Not Found'
      })
    }

    const userData = TokenService.validateAccessToken(accessToken)
    console.log(userData);
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