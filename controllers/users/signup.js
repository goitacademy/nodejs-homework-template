const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`Email ${email} in use`);
    }
    // Вариант с созданием методов модели для хэширования
    // const newUser = new User({name, email});
    // newUser.setPassword(password);
    // newUser.save();

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({ name, email, password: hashPassword });
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
