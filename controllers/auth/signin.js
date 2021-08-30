const jwt = require("jsonwebtoken");
const { users: service } = require("../../services");

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await service.getOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
    }
    // if(!user) {
    //     return res.status(404).json({
    //         status: "error",
    //         code: 404,
    //         message: "Not found"
    //     });
    // }
    // if(!user.comparePassword(password)){
    //     return res.status(400).json({
    //         status: "error",
    //         code: 400,
    //         message: "Wrong password"
    //     });
    // }
    const payload = {
      id: user._id,
    };
    const { SECRET_KEY } = process.env;

    const token = jwt.sign(payload, SECRET_KEY);
    await service.update(user._id, { token });
    res.json({
      status: "OK",
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signin;
