import { HttpCode } from "../../lib/constants";
import { updateContact } from "../../repository/contacts";
import { CustomError } from '../../lib/custom-error';

export const updateContactCb = async (req, res, next) => {
  const {id: userId} = req.user;
  const { id } = req.params;
  const contact = await updateContact(userId, id, req.body);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not found")
};