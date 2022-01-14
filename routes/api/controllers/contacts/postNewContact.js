import contactsRepository from "../../../../repository/contacts";
import { HttpCode } from "../../../../lib/constants";

export const postNewContact = async (req, res, next) => {
  const { id: userId } = req.user;
  const newContact = await contactsRepository.addContact(userId, req.body);
  res.status(HttpCode.CREATE).json(newContact);
};
