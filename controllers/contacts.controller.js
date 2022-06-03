const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

class ContactController {
  async getAllContacts(req, res) {
    const contacts = await listContacts();

    res.status(200).send(contacts);
  }

  async getContactById(req, res) {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) res.status(404).send({ message: "Not found" });

    res.status(200).send(contact);
  }

  async createContact(req, res) {
    const contact = req.body;
    const newContact = await addContact(contact);

    res.status(201).send(newContact);
  }

  async deleteContact(req, res) {
    const { contactId } = req.params;
    const existContact = await getContactById(contactId);

    if (!existContact) return res.status(404).send({ message: "Not found" });

    await removeContact(existContact.id);

    res.status(200).send({ message: "contact deleted" });
  }

  async updateContact(req, res) {
    const { contactId } = req.params;
    const contact = req.body;

    const existContact = await getContactById(contactId);

    if (!existContact) return res.status(404).send({ message: "Not found" });

    const updatedContact = await updateContact(contactId, contact);

    res.status(200).send(updatedContact);
  }
}

const contactController = new ContactController();
module.exports = contactController;
