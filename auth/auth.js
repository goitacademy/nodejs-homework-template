const { getUser } = require("../controllers/usersControllers");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const { id } = jwt.verify(token, secret);
    const user = await getUser("_id", id);
    if (!user) {
      return res.status(401).send({ message: "unathorized" });
    }
    if (user) {
      next();
    }
  } catch {
    return res.status(401).send({ message: "unathorized" });
  }
};

module.exports = { auth };
