import { HttpCode } from "../../lib/constants";
import { updateContact } from "../../repository/contacts";
export const updateContactCb = async (req, res, next) => {
  const { id } = req.params;
  const contact = await updateContact(id, req.body);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
};