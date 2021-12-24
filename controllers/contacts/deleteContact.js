import { removeContact } from "../../repository";
import { HttpCode } from "../../lib/constants";
export const removeContactCb = async (req, res, next) => {
  const { id } = req.params;
  const contact = await removeContact(id);
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { contact },
      message: "Contact deleted",
    });
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
};