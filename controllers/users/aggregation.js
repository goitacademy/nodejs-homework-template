import repositoryContacts from '../../repository/contacts'
import { HttpCode } from '../../lib/constants'
import { CustomError } from '../../lib/custom-error';

export const aggregation = async (req, res, next) => {
    const { id } = req.params
    const data = await repositoryContacts.getStatisticsContacts(id)
    if (data) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data })
    }
    throw new CustomError(HttpCode.NOT_FOUND, 'Not found')
    
  }