import { HttpCode } from "../../lib/constants";
import { addContact } from "../../repository/contacts";
export const addContactCb = async (req, res, next) => {
  const { id: userId } = req.user;
  const createContact = await addContact(userId, req.body);
  res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.OK,
    data: { contact: createContact },
    message: "Contact created",
  });
};
