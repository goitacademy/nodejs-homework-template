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

const aggregation = async (req, res, next) => {
  const { id } = req.params;

  const data = await repositoryContacts.getStatisticsContacts(id);
  if (data) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data });
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
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
  res.status(HttpCode.BAD_REQUEST).json({
    status: "success",
    code: HttpCode.BAD_REQUEST,
    data: { message: "invalid token" },
  });
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
    return res.status(HttpCode.UE).json({
      status: "error",
      code: HttpCode.UE,
      data: { message: "Unprocessable Entity" },
    });
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    data: { message: "User not found by email" },
  });
};

export { aggregation, uploadAvatar, verifyUser, repeatEmailVerifyUser };
