import { HttpCode } from "../../lib/constants";
import { getContactById } from "../../repository/contacts";
export const getContactByIdCb = async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  console.log(contact); // toObject
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } }); // toJson
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
};
