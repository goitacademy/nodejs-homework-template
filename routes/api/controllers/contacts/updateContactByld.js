import contactsRepository from "../../../../repository/contacts";
import { HttpCode } from "../../../../lib/constants";

export const updateContactById = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const updateContact = await contactsRepository.updateContact(
    userId,
    id,
    req.body
  );
  if (updateContact) {
    res.status(HttpCode.OK).json(updateContact);
    return;
  }
  res.status(HttpCode.NOT_FOUND).json({ message: "Not found" });
};
