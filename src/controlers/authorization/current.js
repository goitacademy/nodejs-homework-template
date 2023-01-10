const { current } = require("../../services/auth");
const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../../helpers/errors");
const currentController = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(" ");
  if (!token) {
    const err = new NotAuthorizedError("Give me a token, mazafaka!!!");
    return err;
  }
  try {
    const data = jwt.decode(token, process.env.JWT_SECRET);
    console.log(data._id);
    const userId = data._id;
    const user = await current(userId);
    if (!user || user.token !== token) {
      const err = new NotAuthorizedError("Give me a token, mazafaka!!!");
      return err;
    }
    req.user = user;

    res.status(200).json({
      user,
    });
    // next();
  } catch (error) {
    const err = new NotAuthorizedError(
      "Will you give me a correct token, mazafaka&&&"
    );
    console.log(err);
  }
};
module.exports = {
  currentController,
};
