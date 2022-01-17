import repositoryContacts from '../../repository/contacts'
import { HttpCode } from '../../lib/constants';
import { NOT_FOUND } from '../../lib/messages';

  const aggregation = async (req, res, next) => {
    const { id } = req.params
    const data = await repositoryContacts.getStatisticContacts(id)
    if(data) {
      return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data });
    }
    res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: NOT_FOUND.en})
  }

  export {aggregation}