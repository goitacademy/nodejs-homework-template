import operations from "../../contactsApp/index";
import { HttpCode } from "../../lib/constants";

const addContact = async (req, res, _next) => {
  const {id: userId} = req.user;
  const newContact = await operations.addContact( userId, req.body );
  res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.OK,
    data: { contact: newContact },
  });
};
export default addContact;
