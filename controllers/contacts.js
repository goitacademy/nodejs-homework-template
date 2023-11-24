const { createContactSchema, updateContactSchema } = require("../joi/contactSchema");
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
    contact
    ? res.json({
      status: 200,
      message: 'Contact received successfully!',
      data: contact,
    })
    : res.json({
      status: 400,
      message: "Not found",
    });    
  }
  
  removeContact = async (req, res) => {
    const { contactId } = req.params;
    const contact = await this.contactsService.remove(contactId);
    contact
    ? res.json({
      status: 200,
      message: 'Contact deleted successfully!',
      data: contact,
    })
      : res.json({
      status: 404,
      message: "Not found",
    }); 
  }

  addContact = async (req, res) => {
    try {
      await createContactSchema.validateAsync(req.body)
      const contact = await this.contactsService.add(req.body)
      res.json({
        status: 201,
        message: 'Contact added successfully!',
        data: contact,
      });
    } catch (err) {
      res.json({
        status: 400,
        message: err.message
      })
    }
  }

  updateContact = async (req, res) => {
    try {
      const { contactId } = req.params;
      await updateContactSchema.validateAsync(req.body)
      await this.contactsService.updateById(contactId, req.body)
      res.json({ message: `Update contact with id ${contactId}` });
    } catch (err) {
      res.json({status: 400, message: err.message})
    }
  };
}

const contactController = new ContactController(contactsService);

module.exports = contactController;