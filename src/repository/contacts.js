const Contacts = require("../schemas/contacts");

class ContactsRepository {
  constructor() {
    this.model = Contacts;
  }

  async getAll(
    userId,
    { limit = 5, page = 1, sortBy, sortByDesk, filter, favorite }
  ) {
    const result = await this.model.paginate(
      { owner: userId, ...(favorite ? { favorite } : {}) },
      {
        limit,
        page,
        sort: {
          ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
          ...(sortByDesk ? { [`${sortByDesk}`]: -1 } : {}),
        },
        select: filter ? filter.split("|").join(" ") : "",
        populate: { path: "owner", select: "email subscription -_id" },
      }
    );
    return result;
  }

  async getById(userId, id) {
    const result = await this.model
      .findOne({ owner: userId, _id: id })
      .populate({ path: "owner", select: "email subscription -_id" });
    return result;
  }

  async create(userId, body) {
    const result = await this.model.create({ ...body, owner: userId });
    return result;
  }

  async update(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      { owner: userId, _id: id },
      { ...body },
      { new: true }
    );
    return result;
  }

  async remove(userId, id) {
    const result = await this.model.findByIdAndRemove({
      owner: userId,
      _id: id,
    });
    return result;
  }
}

module.exports = ContactsRepository;
