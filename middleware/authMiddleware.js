const jwt = require("jsonwebtoken");
function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid Token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Invalid Token" });
    }
    console.log(decode);
    next();
  });
}

module.exports = auth;
