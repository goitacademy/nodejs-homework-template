import { HttpCode } from "../../lib/constants";
import { getContactById } from "../../repository/contacts";
import { CustomError } from '../../lib/custom-error';

export const getContactByIdCb = async (req, res, next) => {
  const {id: userId} = req.user;
  const { id } = req.params;
  const contact = await getContactById(userId, id);
  console.log(contact); // toObject
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } }); // toJson
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not found")
};