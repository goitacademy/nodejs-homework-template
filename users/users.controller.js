const userDao = require("./users.dao");
const authService = require("../auth/auth.service");
// const getIdFromToken = require("../auth/auth.service");

const signupHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const createdUser = await userDao.createUser({ email, password });

    return res.status(201).send({
      user: {
        email: createdUser.email,
        subscription: createdUser.subscription,
      },
      createdUser,
    });
  } catch (e) {
    const { message } = e;

    if (e instanceof userDao.DuplicatedEmailError) {
      return res.status(409).send({ message });
    }

    return next(e);
  }
};

const loginHandler = async (req, res, next) => {
  try {
    const userEntity = await userDao.getUser(req.body.email);
    const isUserPasswordValid = await userEntity.validatePassword(
      req.body.password
    );
    if (!userEntity || !isUserPasswordValid) {
      return res.status(401).send({ message: "Wrong credentials." });
    }

    const userPayload = {
      _id: userEntity._id,
      email: userEntity.email,
      subscription: userEntity.subscription,
    };

    const token = authService.generateAccessToken(userPayload);

    await userDao.updateUser(userEntity.email, { token });
    userEntity.token = token;

    // const decodedToken = authService.getIdFromToken(token);
    // console.log("DECODED ID:", decodedToken);

    return res.status(200).send({
      user: userPayload,
      token,
    });
  } catch (e) {
    return next(e);
  }
};

const logoutHandler = async (req, res, next) => {
  try {
    const { email } = req.user;
    await userDao.updateUser(email, { token: null });
    return res
      .status(200)
      .send({ message: `user: '${email}' loged out succesfully` });
  } catch (e) {
    return next(e);
  }
};

const currentHandler = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    return res.status(200).send({ user: { email, subscription } });
  } catch (e) {
    console.log("currentHandler ERROR");
    return next(e);
  }
};

module.exports = {
  signupHandler,
  loginHandler,
  logoutHandler,
  currentHandler,
};
