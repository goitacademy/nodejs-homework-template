// middlewares/validateJWT.js
const moment = require("moment");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const Contact = require("../models/contacts");

const ensureAuthenticated = async (req, res, next) => {
  if (!req.headers.authorization) {
    // return res.status(403).json({
    return res.status(StatusCodes.UNAUTHORIZED).json({
      result: null,
      message: "Your request doesn't have authorization header",
    });
  }

  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCIA

  const token = req.headers.authorization.split(" ")[1];
 
     try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);

//   if (!payload) {
//     return res.status(403).json({
//       result: null,
//       message: "Failed to authenticate token.",
//     });
//   }

  console.log(payload);

  if (payload.exp <= moment().unix()) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
        // status: StatusCodes.UNAUTHORIZED,
        result: null,
      message: "Invalid token.",
    });
  }

  const user = await Contact.findById(payload.Id);
  
  if (!user || user.token !== token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        // status: StatusCodes.UNAUTHORIZED,
        result: null,
        message: "Not authorized",
      });
    }
    
         req.user = payload.Id;
         
         next();
          } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
    //   status: StatusCodes.UNAUTHORIZED,
      result: null,
      message: "Failed to authenticate token.",
    });
  }
};
 

module.exports = {
  ensureAuthenticated,
};
