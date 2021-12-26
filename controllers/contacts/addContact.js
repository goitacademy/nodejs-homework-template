import operations from "../../contactsApp/index";
import { HttpCode } from "../../lib/constants";

const addContact = async (req, res, _next) => {
  const newContact = await operations.addContact(req.body);
  res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.OK,
    data: { contact: newContact },
  });
};
export default addContact;
