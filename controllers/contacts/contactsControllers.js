import { HttpCode } from "../../lib/constants";
import {
  addContact,
  removeContact,
  getContactById,
  listContacts,
  updateContact,
} from "../../repository/contacts";

class ContactsService {
  async addContactCb(req, res, next) {
    const { id: userId } = req.user;
    const createContact = await addContact(userId, req.body);
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.OK,
      data: { contact: createContact },
      message: "Contact created",
    });
  }

  async removeContactCb(req, res, next) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const contact = await removeContact(userId, id);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { contact },
        message: "Contact deleted",
      });
    }
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not found",
    });
  }

  async getContactByIdCb(req, res, next) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const contact = await getContactById(userId, id);
    console.log(contact);
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: { contact } }); // toJson
    }
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not found",
    });
  }

  async getContacts(req, res, next) {
    const { id: userId } = req.user;
    const contacts = await listContacts(userId, req.query);
    res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { ...contacts } });
  }

  async updateContactCb(req, res, next) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const contact = await updateContact(userId, id, req.body);
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: { contact } });
    }
    res
      .status(HttpCode.NOT_FOUND)
      .json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "Not found",
      });
  }
}
export default ContactsService;
