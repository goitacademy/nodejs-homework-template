const createError = require('http-errors');
const User = require('../service/schemas/users');
const { 
  createUser, 
  loginUser, 
  logoutUser, 
  updateUserSubscription
 } = require('../service/userService');

const create = async (req, res, next) => {
  const { email, password } = req.body;

  const checkEmail = await User.findOne({ email });
  if (checkEmail) next(createError(409, "Email in use"));

  const user = await createUser({ email, password });

  res.status(201).json({
    data: {
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};


const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.comparePass(password)) {
    return next(createError(401, "Email or password is wrong"));
  };

  const token = await loginUser(user);

  res.status(200).json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};


const logout = async(req, res, next) => {
  const { _id } = req.user;
  const user = await logoutUser({_id});

  if(!user.token) {
    return next(createError(401, "Not authorized"))
  };

  res.status(204).json();
}


const currentUser = async (req, res, next) => {
  res.status(200).json({
    data: {
      user: {
        email: req.user.email,
        subscription: req.user.subscription,
      },
    },
  });
};

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const userSubscription = await updateUserSubscription(_id, req.body.subscription);

  if (!userSubscription) {
    return next(createError(404, "'Not found"));
  }

  res.status(200).json({
    data: {
      subscription: userSubscription.subscription,
    },
  });
};

module.exports = {
  create,
  login,
  logout,
  currentUser,
  updateSubscription,
};
