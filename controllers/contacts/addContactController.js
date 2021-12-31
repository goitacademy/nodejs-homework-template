import { addContact } from "../../repository/contacts";
import { HttpCode } from "../../lib/constants";

const addContactController = async (req, res, next) => {
  const { id: userId } = req.user;
  const newContact = await addContact(userId, req.body);
  res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.CREATED,
    data: { contact: newContact },
  });
};

export default addContactController;
