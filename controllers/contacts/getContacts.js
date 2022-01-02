import operations from "../../contactsApp/index";
import { HttpCode } from "../../lib/constants";

const getContacts = async (req, res, _next) => {
  const {id: userId} = req.user;
  const contacts = await operations.listContacts( userId, req.query );
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { ...contacts } });
};
export default getContacts;
