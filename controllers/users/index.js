import repositoryContacts from "../../repository/contacts";
import repositoryUsers from "../../repository/users";
import { HttpCode } from "../../lib/constants";
import {
  UploadFileService,
  LocalFileStorage,
  CloudFileStorage,
} from "../../service/file-storage";
import {
  EmailService,
  SenderSendgrid,
  SenderNodemailer,
} from "../../service/email";
import { CustomError } from "../../lib/custom-error";

const aggregation = async (req, res, next) => {
  const { id } = req.params;

  const data = await repositoryContacts.getStatisticsContacts(id);
  if (data) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not found");
};

const uploadAvatar = async (req, res, next) => {
  const uploadService = new UploadFileService(
    CloudFileStorage,
    req.file,
    req.user
  );
  const avatarUrl = await uploadService.updateAvater();
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { avatarUrl } });
};

const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.token;
  const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken);
  if (userFromToken) {
    await repositoryUsers.updateVerify(userFromToken.id, true);

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { message: "success" },
    });
  }
  throw new CustomError(HttpCode.BAD_REQUEST, "invalid token");
};

const repeatEmailVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await repositoryUsers.findByEmaill(email);
  if (user) {
    const { email, name, verifyTokenEmail } = user;
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderNodemailer()
    );

    const isSend = await emailService.sendVeryfyEmail(
      email,
      name,
      verifyTokenEmail
    );
    if (isSend) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { message: "success" },
      });
    }
    throw new CustomError(HttpCode.SERVICE_UNAVAILABLE, "Service unavailable");
  }
  throw new CustomError(HttpCode.NOT_FOUND, "User not found by email");
};

export { aggregation, uploadAvatar, verifyUser, repeatEmailVerifyUser };
