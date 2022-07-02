const { repositoryContacts } = require('../../repository');
const { NotFound, Conflict } = require('http-errors');
const { HttpStatusCode } = require('../../libs');
const { ContactsService } = require('../../service/contacts');

class ContactsController {
  async getContactsList(req, res, next) {
    try {
      const { id: userId } = req.user;
      const contacts = await repositoryContacts.getContactsList(userId, req.query);
      res.json({
        status: 'success',
        code: HttpStatusCode.OK,
        data: {
          ...contacts,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getContactsById(req, res, next) {
    try {
      const { contactId } = req.params;
      const { id: userId } = req.user;
      const result = await repositoryContacts.getContactById(userId, contactId);
      if (!result) {
        throw new NotFound(`Contact with id=${contactId} not found!`);
      }
      res.status(HttpStatusCode.OK).json({
        status: 'success',
        code: HttpStatusCode.OK,
        data: {
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async addContact(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { email } = req.body;
      const isContactExist = await ContactsService.isUserExist(userId, email);
      if (isContactExist) {
        throw new Conflict(`Email ${email} is already exist`);
      }
      const newContact = await repositoryContacts.addContact(userId, req.body);
      res.status(HttpStatusCode.CREATED).json({
        status: 'success',
        code: HttpStatusCode.CREATED,
        data: {
          contact: newContact,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async removeContactById(req, res, next) {
    try {
      const { contactId } = req.params;
      const { id: userId } = req.user;

      const contactByid = await repositoryContacts.removeContactById(userId, contactId);
      if (!contactByid) {
        throw new NotFound(`Contact with id=${contactId} not found!`);
      }
      res.json({
        status: 'success',
        code: HttpStatusCode.OK,
        data: { contactByid },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateContactById(req, res, next) {
    try {
      const { contactId } = req.params;
      const { id: userId } = req.user;
      const contactUpdate = await repositoryContacts.updateContactById(userId, contactId, req.body);
      if (!contactUpdate) {
        throw new NotFound(`Contact with id=${contactId} not found!`);
      }
      res.json({
        status: 'success',
        code: HttpStatusCode.OK,
        data: { contactUpdate },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateStatusContact(req, res, next) {
    try {
      const { contactId } = req.params;
      const { favorite } = req.body;
      const { id: userId } = req.user;
      const contactUpdate = await repositoryContacts.updateStatusContactById(userId, contactId, favorite);
      if (!contactUpdate) {
        throw new NotFound(`Contact with id=${contactId} not found!`);
      }
      res.json({
        status: 'success',
        code: HttpStatusCode.OK,
        data: { contactUpdate },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new ContactsController();
