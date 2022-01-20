import repositoryContacts from '../../repository/contacts'
import { HttpCode } from '../../lib/constants'

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
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
}

export { aggregation }
