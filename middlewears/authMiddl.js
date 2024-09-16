const RequestError = require("../help/ReqError");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const auth = async (request, response, next) => {
    try {
      if (!request.headers.authorization) throw RequestError(401, "Not authorized");
  
      const [bearer, token] = request.headers.authorization.split(" ");
      if (bearer !== "Bearer") throw RequestError(401, "Not authorized");
  
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(id);
      if (!user || !user.token || user.token !== token) throw RequestError(401);
  
      request.user = user;
  
      next();
    } catch (err) {
      throw RequestError(401, "Please provide a valid token");
    }
  };
  
  module.exports = auth;