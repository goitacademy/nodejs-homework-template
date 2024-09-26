const jwt = require("jsonwebtoken");
const { getUserById } = require("../controllers/users.js");

const jwtSecret = 'nick';

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log("decoded", decoded);
    const id = decoded.id;
    console.log("id", id);

    const user = await getUserById(id);
    if (user) {
      next();
    } else {
      return res.status(401).send("Not authorized");
    }
  } catch {
    return res.status(401).send("Access denied");
  }
};

module.exports = { auth };
