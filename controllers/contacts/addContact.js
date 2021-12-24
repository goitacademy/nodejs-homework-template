import { HttpCode } from "../../lib/constants";
import { addContact } from "../../repository";
export const addContactCb = async (req, res, next) => {
  const createContact = await addContact(req.body);
  res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.OK,
    data: { contact: createContact },
    message: "Contact created",
  });
};