const ContactsService = require("../services/ContactsService");
const HTTPError = require("../helpers/HTTPError");
const HTTPResponse = require("../helpers/HTTPResponse");

class ContactsController {
  constructor() {
    this.service = ContactsService;
  }

  getAllContacts = async (req, res) => {
    const { id: owner } = res.locals.user;

    const { page = 1, limit = 5, favorite } = req.query;
    const skip = (page - 1) * limit;

    const filter = {
      owner,
    };

    if (favorite) {
      filter.favorite = favorite;
    }

    const contacts = await this.service.getContacts(filter, skip, limit);

    if (!contacts) {
      throw HTTPError(400);
    }

    HTTPResponse(res, 200, contacts);
  };

  getOneContact = async (req, res) => {
    const id = req.params.contactId;
    const contact = await this.service.getContact(id);

    if (!contact) {
      throw HTTPError(400);
    }

    HTTPResponse(res, 200, contact);
  };

  deleteContact = async (req, res) => {
    const id = req.params.contactId;
    const contact = await this.service.deleteContact(id);

    if (!contact) {
      throw HTTPError(404);
    }

    HTTPResponse(res, 200, contact, `Contact with ID ${id} deleted`);
  };

  createContact = async (req, res) => {
    const { id: owner } = res.locals.user;
    const contact = await this.service.createContact({ ...req.body, owner });

    if (!contact) {
      HTTPError(400, "Provide all fields");
    }

    HTTPResponse(res, 201, contact);
  };

  updateContact = async ({ params: { contactId }, body }, res) => {
    const updatedContact = await this.service.updateContact(contactId, body);

    if (!updatedContact) {
      HTTPError(404);
    }

    HTTPResponse(
      res,
      200,
      updatedContact,
      `User With ID: ${contactId} successfully updated`
    );
  };

  updateStatusContact = async ({ params: { contactId }, body }, res) => {
    if (!body.favorite) {
      HTTPError(400, "Missing field favorite");
    }

    const updatedStatusContact = await this.service.updateStatusContact(
      contactId,
      body
    );

    if (!updatedStatusContact) {
      HTTPError(404);
    }

    HTTPResponse(
      res,
      200,
      updatedStatusContact,
      "field 'favorite' updated successfully"
    );
  };
}

module.exports = new ContactsController();
