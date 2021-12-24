import updateContact from '../../models/contacts/updateContact';
import { HttpCode } from '../../lib/constants';

const updateContactController = async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await updateContact(id, req.body)
  if (updatedContact) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { updatedContact } })
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
}

export default updateContactController
