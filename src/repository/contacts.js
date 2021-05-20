const { v4: uuid } = require("uuid");
const db = require("../db");

class ContactsReporitory {
  listContacts() {
    return db.get("contacts").value();
  }

  getContactById(id) {
    return db.get("contacts").find({ id }).value();
  }

  addContact(body) {
    const id = uuid();

    const newElem = {
      id,
      ...body,
    };

    db.get("contacts").push(newElem).write();

    return newElem;
  }

  removeContact(id) {
    const [removedContact] = db.get("contacts").remove({ id }).write();
    return removedContact;
  }

  updateContact(id, body) {
    const updatedContact = db.get("contacts").find({ id }).assign(body).value();

    db.write();

    return updatedContact;
  }
}

module.exports = { ContactsReporitory };
