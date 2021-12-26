import operations from "../../contactsApp/index";
import { HttpCode } from "../../lib/constants";
const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await operations.removeContact(id);
  if (contact) {
    console.log(
      "🚀 ~ file: contacts.js ~ line 29 ~ router.delete ~ contact",
      contact
    );
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

export default removeContact;