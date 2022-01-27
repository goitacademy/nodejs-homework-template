import { HttpCode } from "../../lib/constants";
import authService from "../../service/auth";
import {
  EmailService,
  SenderNodemailer,
  SenderSendgrid,
} from "../../service/email";
import { CustomError } from "../../lib/custom-error";

const registration = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await authService.isUserExist(email);
  if (isUserExist) {
    throw new CustomError(HttpCode.CONFLICT, "Emai is already exist");
  }
  const userData = await authService.create(req.body);
  const emailService = new EmailService(
    process.env.NODE_ENV,
    new SenderSendgrid()
  );

  const isSend = await emailService.sendVeryfyEmail(
    email,
    userData,
    userData.verifyTokenEmail
  );
  delete userData.verifyTokenEmail;

  res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.CREATED,
    data: { ...userData, isSendEmailVerify: isSend },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.getUser(email, password);
  if (!user) {
    throw new CustomError(HttpCode.UNAUTHORIZED, "Invalid credentials");
  }
  const token = authService.getToken(user);
  await authService.setToken(user.id, token);
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { token } });
};

const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null);
  res
    .status(HttpCode.NO_CONTENT)
    .json({ status: "success", code: HttpCode.OK, data: {} });
};

export { registration, login, logout };
