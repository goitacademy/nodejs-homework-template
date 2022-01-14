import contactsRepository from "../../../../repository/contacts";
import { HttpCode } from "../../../../lib/constants";

export const removeContactById = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const resp = await contactsRepository.removeContact(userId, id);
  if (resp) {
    res.status(HttpCode.OK).json({ "Deleted contact": resp });
    return;
  }
  res.status(HttpCode.NOT_FOUND).json({ message: "Not found" });
};
