const { v4: uuid } = require("uuid");
const db = require("../db/index");

class ContactsRepository {
  constructor() {}

  getAll() {
    return db.get("contacts").value();
  }

  getById(id) {
    console.log(id);
    return db.get("contacts").find({ id }).value();
  }

  create(body) {
    const id = uuid();
    const recodr = { id, ...body };
    return db.get("contacts").push(recodr).write();
  }

  update(id, body) {
    const record = db.get("contacts").find({ id }).assign(body).value();
    db.write();
    return record.id ? record : null;
  }

  remove(id) {
    const [record] = db.get("contacts").remove({ id }).write();
    return record;
  }
}

module.exports = ContactsRepository;
