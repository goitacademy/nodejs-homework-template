import operations from "../../contactsApp/index";
import { HttpCode } from "../../lib/constants";
const getContactById = async (req, res, _next) => {
  const { id } = req.params;
  const contact = await operations.getContactById(id);
  console.log(contact);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: "Not found",
  });
};
export default getContactById;