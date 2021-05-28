const { ObjectID } = require("mongodb");
const { HttpCode } = require("../helpers/constants");
const { ErrorHandler } = require("../helpers/errorHandler");

class ContactsReporitory {
  constructor(client) {
    this.collection = client.db().collection("contacts");
  }

  #getMongoId(id) {
    try {
      return ObjectID(id);
    } catch (e) {
      throw new ErrorHandler(
        HttpCode.BAD_REQUEST,
        `MongoDb _id: ${e.message}`,
        "Bad Request"
      );
    }
  }

  async listContacts() {
    const results = await this.collection.find({}).toArray();
    return results;
  }

  async getContactById(id) {
    const objectId = this.#getMongoId(id);

    const [result] = await this.collection.find({ _id: objectId }).toArray();
    return result;
  }

  async addContact(body) {
    const record = {
      ...body,
      ...(body.favorite ? {} : { favorite: false }),
    };
    const {
      ops: [result],
    } = await this.collection.insertOne(record);

    return result;
  }

  async removeContact(id) {
    const objectId = this.#getMongoId(id);

    const { value: result } = await this.collection.findOneAndDelete({
      _id: objectId,
    });
    return result;
  }

  async updateContact(id, body) {
    const objectId = this.#getMongoId(id);

    const { value: result } = await this.collection.findOneAndUpdate(
      { _id: objectId },
      { $set: body },
      { returnOriginal: false }
    );
    return result;
  }

  async updateStatusContact(id, body) {
    const objectId = this.#getMongoId(id);

    const { value: result } = await this.collection.findOneAndUpdate(
      { _id: objectId },
      { $set: body },
      { returnOriginal: false }
    );
    return result;
  }
}

module.exports = { ContactsReporitory };
