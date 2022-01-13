import { HttpCode } from "../../lib/constants";
import {
  UploadFileService,
  LocalFileStorage,
  CloudFileStorage,
} from "../../service/upload";
const uploadAvatar = async (req, res, next) => {
  const uploadService = new UploadFileService(
    LocalFileStorage,
    req.file,
    req.user
  );
  const avatarUrl = await uploadService.updateAvatar();
  res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: { avatarUrl },
  });
};

export default uploadAvatar;
