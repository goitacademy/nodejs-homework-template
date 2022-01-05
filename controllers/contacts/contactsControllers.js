import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../../repository/contacts";
import { HttpCode } from "../../lib/constants";

class ContactsControllers {
  async listContactsController(req, res, next) {
    const { id: userId } = req.user;
    const contacts = await listContacts(userId, req.query);
    res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { ...contacts } });
  }

  async getContactByIdController(req, res, next) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const contact = await getContactById(userId, id);
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
  }

  async addContactController(req, res, next) {
    const { id: userId } = req.user;
    const newContact = await addContact(userId, req.body);
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { contact: newContact },
    });
  }

  async removeContactController(req, res, next) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const contact = await removeContact(userId, id);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { contact },
      });
    }
    res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not found",
    });
  }

  async updateContactController(req, res, next) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const contact = await updateContact(userId, id, req.body);
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
  }

  async updateStatusContactController(req, res, next) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const contact = await updateContact(userId, id, req.body);
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
  }
}

export default ContactsControllers;
