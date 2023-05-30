const { Contact } = require("../models");

class ContactServices {
  async add(data) {
    const result = await Contact.create({ ...data });
    if (!result) {
      return null;
    }
    return result;
  }

  async delete(id) {
    const deletedContact = await Contact.findOneAndDelete({ _id: id });
    if (!deletedContact) {
      return null;
    }
    return deletedContact;
  }

  async getAll(owner, page, limit) {
    const skip = (page - 1) * limit;
    const allContacts = await Contact.find({ owner }, "", {
      skip,
      limit,
    }).populate("owner", "email");
    if (!allContacts) {
      return null;
    }
    return allContacts;
  }

  async getById(id) {
    const contact = await Contact.findOne({ _id: id });
    if (!contact) {
      return null;
    }
    return contact;
  }

  async setFavorite(id, data) {
    const result = await Contact.findByIdAndUpdate(id, { ...data });
    if (!result) {
      return null;
    }
    return result;
  }

  async update(id, data) {
    const result = await Contact.findOneAndUpdate({ _id: id }, { ...data });
    if (!result) {
      return null;
    }

    return result;
  }
}

module.exports = new ContactServices();
