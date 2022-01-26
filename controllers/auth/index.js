import AuthService from '../../services/auth';
import { HttpCode } from '../../lib/constants';

const authService = new AuthService();

const registration = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await authService.isUserExist(email);
  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email in use',
    });
  }
  const data = await authService.create(req.body);
  res
    .status(HttpCode.CREATED)
    .json({ status: 'success', code: HttpCode.CREATED, data });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.getUser(email, password);
  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Email or password is wrong',
    });
  }
  const token = authService.getToken(user);
  await authService.setToken(user.id, token);

  res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data: { token } });
};

const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null);
  res.status(HttpCode.NO_CONTENT);
};
const getCurrent = (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { email, subscription },
  });
};
const updateSubscription = async (req, res, next) => {
  const { id, subscription } = req.body;
  const { name, email } = await authService.updateUserSubscription(
    id,
    subscription,
  );
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { id, name, email, subscription },
  });
};

export { registration, login, logout, getCurrent, updateSubscription };