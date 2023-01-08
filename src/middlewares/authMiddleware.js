const jwt = require("jsonwebtoken");
const {
  NotAuthorizedError,
  //   WrongParametersError,
} = require("../helpers/errors");
const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers.authorization.split(" ");

  if (!token) {
    next(new NotAuthorizedError("Give me a token, mazafaka!!!"));
  }
  try {
    console.log("tokenType:", tokenType);
    // console.log("token:", token);
    const user = jwt.decode(token, process.env.JWT_SECRET);

    req.token = token;
    req.user = user;
    // console.log(user);
    next();
  } catch (err) {
    next(
      new NotAuthorizedError("Will you give me a correct token, mazafaka&&&")
    );
  }
  next();
};
module.exports = {
  authMiddleware,
};
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2I5YjkxOTczMDAzNmU1ZDk0MzRiZTYiLCJpYXQiOjE2NzMxMTU5NTZ9.5HJXwT2XRAQK1JTn2gnHuVHmJaR3-1XCkXsus3e4_Ig",
