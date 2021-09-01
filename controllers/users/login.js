const bcrypt = require("bcryptjs");
const { User } = require("../../models");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {

      const hashPassword = user.password;
      const compareResult = bcrypt.compareSync(password, hashPassword);
    //   const compareResult = user.comparePassword(pasword)
      if (compareResult) {
const token = 'hjkdfbreu2'
        return res.status(200).json({
          status: "OK",
          code: 200,
          ResponseBody: {
            token: token,
            user: {
              email: email,
              subscription: "starter",
            },
          },
        });
      }

    }

    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Email or password is wrong",
    });

  } catch (err) {
    next(err);
  }
};

module.exports = login;
