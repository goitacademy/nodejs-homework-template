import authService from '../../services/auth';
import {
  UploadFileService,
  LocalFileService,
} from '../../services/storage/index';
import { HttpCode } from '../../connection/constants';

const registration = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
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

    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
        user: { email: user.email, subscription: user.subscription },
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.setToken(req.user.id, null);
    res.status(HttpCode.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

const getCurrent = (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    const uploadAvatar = new UploadFileService(
      LocalFileService,
      req.file,
      req.user,
    );
    const avatarUrl = await uploadAvatar.updateAvatar();
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { avatarUrl },
    });
  } catch (error) {
    next(error);
  }
};

export {
  registration,
  login,
  logout,
  getCurrent,
  updateSubscription,
  uploadAvatar,
};