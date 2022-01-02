import listContacts from '../../models/contacts/listContacts';
import { HttpCode } from '../../lib/constants';

const listContactsController = async (req, res, next) => {
  const contacts = await listContacts(req.query);
  console.log(req.query);
  res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data: { ...contacts } })
}

export default listContactsController;