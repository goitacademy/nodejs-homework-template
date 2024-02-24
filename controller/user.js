// const User = require("../service/schemas/user");
const {createUser, findUser ,findUserByID} = require("../service/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../config/passport-jwt");

const addUser = async (req, res, next) => {
  const { password, email } = req.body;

  try {
    const isUserExist = await findUser({ email });

    if (isUserExist) {
      res.status(409).json({
        status: "conflict",
        code: 409,
        data: `email ${email} is alredy used`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await createUser({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const loginUser = async (req, res, next) => {
  const { password, email } = req.body;

  try {
    const user = await findUser({ email });

    if (!user) {
      res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: `There is no user ${email}`,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Wrong password",
      });
    }

    user.token = generateToken(user);
    await user.save();
    res.status(200).json({
      message: "Login successful",
      token: user.token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const logoutUser = async (req, res, next) => {
  const { id } = req.user;
  
  try {
    const user = await findUserByID({ id });
    console.log(user)
    if (user) {
      res
      .status(204)
      .json({ status: "No content", code: 204, message: "logout succesful" });
    } else {
      res
        .status(401)
        .json({ status: "Unauthorized", code: 401, message: "Not authorized" });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getCurrentUser = async (req, res) => {

  const { email, subscription } = req.user;
  await res.json({
    status: "Success",
    code: 200,
    ResponseBody: { email, subscription },
  });
};

module.exports = { addUser, loginUser, logoutUser, getCurrentUser };
