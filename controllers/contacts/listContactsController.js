import { listContacts } from "../../repository/contacts";
import { HttpCode } from "../../lib/constants";

const listContactsController = async (req, res, next) => {
  const { id: userId } = req.user;
  const contacts = await listContacts(userId, req.query);
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { ...contacts } });
};

export default listContactsController;
