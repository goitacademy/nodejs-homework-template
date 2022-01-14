import contactsRepository from "../../../../repository/contacts";
import { HttpCode } from "../../../../lib/constants";

export const getContactById = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const contact = await contactsRepository.getContactById(userId, id);
  if (contact) {
    res.status(HttpCode.OK).json(contact);
    return;
  }
  res.status(HttpCode.NOT_FOUND).json({ message: "Not found" });
};
