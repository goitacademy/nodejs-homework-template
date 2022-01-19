import repositoryContacts from '../../repository/contacts'
import { HttpCode } from '../../lib/constants'
import { NOT_FOUND } from '../../lib/messages';
import {UploadFileService, LocalFileStorage} from '../../service/file-storage'

const aggregation = async (req, res, next) => {
  const { id } = req.params
  const data = await repositoryContacts.getStatisticsContacts(id)
  if (data) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data })
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: NOT_FOUND.en })
}

const uploadAvatar = async (req, res, next) => {
  const uploadService = new UploadFileService(LocalFileStorage, req.file, req.user)
  const avatarUrl = await uploadService.updateAvatar()
  res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data: {avatarUrl} })
}


export { aggregation, uploadAvatar}
