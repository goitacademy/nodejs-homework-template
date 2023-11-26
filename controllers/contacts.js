const contactsService = require("../services/contactsService");

class ContactController {
  constructor(contactsService) {
    this.contactsService = contactsService;
  }

  listContacts = async (req, res) => {
    const contacts = await this.contactsService.getAll();
    res.json({
      status: 200,
      message: 'All contacts successfully received!',
      data: contacts,
    });
  }

  getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await this.contactsService.getOneById(contactId);
    res.json({
      status: 200,
      message: 'Contact received successfully!',
      data: contact,
    });    
  }

  createContact = async (req, res) => {
    console.log(req.body)
    const contact = await this.contactsService.create(req.body)
    res.json({
      status: 201,
      message: 'Contact created successfully!',
      data: contact, });
  }

  updateContact = async (req, res) => {
    const { contactId } = req.params;
    const { body } = req;
    const contact = await this.contactsService.updateById(contactId, body);
    res.json({
      status: 200,
      message: `Update contact with id ${contactId}`,
      data: contact,
    });
  };

  deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const contact = await this.contactsService.deleteById(contactId);
    res.json({
      status: 200,
      message: 'Contact deleted successfully!',
      data: contact,
    });
  }
}

const contactController = new ContactController(contactsService);

module.exports = contactController;