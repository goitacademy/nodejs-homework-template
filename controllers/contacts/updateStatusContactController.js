import repositoryContacts from "../../repository";
import { HttpCode } from "../../lib/constants";

const updateStatusContactController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoryContacts.updateContact(id, req.body);
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

export default updateStatusContactController;
