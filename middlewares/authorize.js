const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { getConfig } = require("../config");
// const { Forbidden } = require("joi");
const { User } = require("../modules/auth/auth.model");

const authorize = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  const { jwt: jwtConfig } = getConfig();
  try {
    const { userId } = jwt.verify(token, jwtConfig.secret);

    const user = await User.findById(userId);

    if (!user || !user.token) {
      return next(new Unauthorized());
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    return next(new Unauthorized());
  }
};

// const authorize = (...permissions) => {
//   return (req, res, next) => {

//     const {jwt:jwtConfig}= getConfig();
//     const authHeader = req.headers.authorization || "";
//     const token = authHeader.replace("Bearer", "");

//     let payload;
//     try {
//       payload = jwt.verify(token, jwtConfig.secret);
//     } catch (error) {
//       return next(new Unauthorized());
//     }

//     const hasUserPermisssions = checkPermissions(payload, permissions);

//     if (!hasUserPermisssions) {
//       return next(new Forbidden("Action is not allowed"));
//     }
//     req.userId = payload.userId;
//     next();
//   };
// };
// const checkPermissions = (payload, permissions) => {
//   const userPermissions = payload.permissions || [];
//   if (permissions.length === 0){
//     return true;
//   }
//     return permissions.some((perm) => userPermissions.includes(perm));
// };

module.exports = { authorize };
