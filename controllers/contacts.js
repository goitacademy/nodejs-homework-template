const contactsService = require("../services/contactsService");

class ContactController {
  constructor(contactsService) {
    this.contactsService = contactsService;
  }

  listContacts = async (req, res) => {
    const { limit = 5, page = 1, favorite } = req.query;
    const config = {
      limit: parseInt(limit),
      page: parseInt(page),
    }

    if (favorite) {
      config.favorite = Boolean(parseInt(favorite));
    }
    
    const { contacts, count } = await this.contactsService.getAll(config);

    res.json({
      status: 200,
      message: 'All contacts successfully received!',
      data: { contacts, count, page: parseInt(page), limit: parseInt(limit) },
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