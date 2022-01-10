import { HttpCode } from '../../lib/constants';
import AuthService from '../../service/auth/index';
import { CONFLICT, UNAUTHORIZED_LOGIN, UNAUTHORIZED } from '../../lib/messages';
const authService = new AuthService()

const signup = async (req, res, next) => {
  const { email } = req.body
  const isUserExist = await authService.isUserExist(email)
  if (isUserExist) {
    return res
      .status(HttpCode.CONFLICT)
      .json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: CONFLICT.en
      });
  }
  const data = await authService.create(req.body)
  res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data });
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await authService.getUser(email, password)
  if (!user) {
    return res
      .status(HttpCode.UNAUTHORIZED)
      .json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: UNAUTHORIZED_LOGIN.en
      });
  }
  const token = authService.getToken(user)
  await authService.setToken(user.id, token)
  res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data: { token } });
}

const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null)
  res
    .status(HttpCode.NO_CONTENT)
    .json({ status: 'success', code: HttpCode.OK, data: {} });
}

const current = async (req, res) => {
  const { email } = req.user;
  if (!req.user.token || !req.user.id) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: "error",
      code: HttpCode.UNAUTHORIZED,
      message: UNAUTHORIZED.en,
    });
  }
  res.json({
    status: "success",
    code: HttpCode.OK,
    data: {
      user: {
        email,
      },
    },
  });
};

export { signup, login, logout, current }