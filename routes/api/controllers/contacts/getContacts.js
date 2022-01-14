import contactsRepository from "../../../../repository/contacts";
import { HttpCode } from "../../../../lib/constants";

export const getContacts = async (req, res, next) => {
  const { id: userId } = req.user;
  const contacts = await contactsRepository.listContacts(userId, req.query);
  res.status(HttpCode.OK).json(contacts);
};
