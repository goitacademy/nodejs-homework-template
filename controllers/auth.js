// service/auth.js
const service = require("../services/auth");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    // console.log("test: ", req.body);

    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    req.body.owner = payload.Id;
    // console.log("test2: ", req.body);

    const { success, result, message } = await service.signup(req.body);

    // console.log(result);

    if (!success) {
      if (message === "Email in use") {
        return res.status(409).json({
          result,
          message,
        });
      } else {
        return res.status(400).json({
          result,
          message,
        });
      }
    }
    return res.status(201).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password, active } = req.body;

    const { success, result, message } = await service.login(
      email,
      password,
      active
    );

    // console.log("a:", result.token);

    if (!success) {
      if (message === "Email or password is wrong") {
        return res.status(401).json({
          result,
          message,
        });
      } else {
        return res.status(400).json({
          result,
          message,
        });
      }
    }
    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

module.exports = {
  signup,
  login,
};
