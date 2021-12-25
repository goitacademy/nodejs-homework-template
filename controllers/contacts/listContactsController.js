import repositoryContacts from "../../repository";
import { HttpCode } from "../../lib/constants";
const listContactsController = async (req, res, next) => {
  try {
    const contacts = await repositoryContacts.listContacts(req.query);
    res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { ...contacts } });
  } catch (error) {
    console.log(error.message);
  }
};

export default listContactsController;
