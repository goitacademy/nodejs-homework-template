const Contact = require("../schemas/contacts");

class ContactsReporitory {
  constructor() {
    this.model = Contact;
  }

  async listContacts(
    userId,
    { limit = 20, page = 1, sortBy, sortByDesc, filter }
  ) {
    const result = await this.model.paginate(
      { owner: userId },
      {
        limit,
        page,
        sort: {
          ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
          ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
        },
        select: filter ? filter.split(" | ").join(" ") : "",
        populate: {
          path: "owner",
          select: "name email subscription",
        },
      }
    );
    return result;
  }

  async getContactById(userId, id) {
    const result = await this.model
      .findOne({ _id: id, owner: userId })
      .populate({
        path: "owner",
        select: "name email subscription",
      });
    return result;
  }

  async addContact(userId, body) {
    const result = await this.model.create({ ...body, owner: userId });
    return result;
  }

  async removeContact(userId, id) {
    const result = await this.model.findByIdAndRemove({
      _id: id,
      owner: userId,
    });
    return result;
  }

  async updateContact(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true }
    );
    return result;
  }

  async updateStatusContact(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true }
    );
    return result;
  }
}

module.exports = { ContactsReporitory };
