const {contactsModel} = require("./contacts.model");
const {NotFound,Conflict} = require("http-errors");

class ContactsService {

    async getContacts() {
        return contactsModel.find()
    }

   async createContact(createParams) {
        const existingContact = await contactsModel.findOne({ email: createParams.email });
        if (existingContact) {
            throw new Conflict("Contact with such email already exists");
        }
        return contactsModel.create(createParams);
    };

    async getContact(id) {
        const contact = await contactsModel.findById(id);
        if (!contact) {
            throw new NotFound("contact not found");
        }
        return contact;
    }

    async updateContact(id, updateParams) {
        const contact = await contactsModel.findByIdAndUpdate(id, updateParams, {
            new: true,
        });
        if (!contact) {
            throw new NotFound("contact not found");
        }

        return contact;
    }

    async deleteContact(id) {
        const deleteResult = await contactsModel.deleteOne({ _id: id });
        if (!deleteResult.deletedCount) {
            throw new NotFound("user not found");
        }
    }
}

exports.contactsService = new ContactsService()