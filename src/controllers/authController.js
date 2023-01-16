import {
  login,
  signup,
  logout,
  getCurrentUser,
  updateSubscription,
} from '../services/authService.js';

export const signupController = async (req, res) => {
  const { email, password, subscription } = req.body;

  const newUser = await signup({ email, password, subscription });

  res.status(201).json({
    status: 'created',
    code: 200,
    data: {
      newUser,
    },
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  // const token = await login(email, password);

  // TODO: check condition
  if (!user || !token) {
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Email or password is wrong',
      data: 'Unauthorized',
    });
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      token,
      user,
    },
  });
};

export const logoutController = async (req, res) => {
  const { userId } = req.body;
  // await logout(userId);

  // TODO: check condition
  if (!user) {
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
      data: 'Unauthorized',
    });
  }

  res.status(204).json({
    status: 'success',
    code: 204,
    message: 'No Content',
    data: 'No Content',
  });
};

export const getCurrentUserController = async (req, res) => {
  await getCurrentUser();

  // TODO: check condition
  if (!user) {
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
      data: 'Unauthorized',
    });
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      user,
    },
  });
};

// ! additional
export const updateSubscriptionController = async (req, res) => {
  await updateSubscription();
};
