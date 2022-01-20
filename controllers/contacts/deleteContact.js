import { removeContact } from "../../repository/contacts";
import { HttpCode } from "../../lib/constants";
import { CustomError } from '../../lib/custom-error';

export const removeContactCb = async (req, res, next) => {
  const {id: userId} = req.user;
  const { id } = req.params;
  const contact = await removeContact(userId, id);
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { contact },
      message: "Contact deleted",
    });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not found")
  
};