const { nanoid } = require('nanoid');

class Contact {
  constructor(payload) {
    this.id = nanoid();
    this.name = payload.name;
    this.email = payload.email;
    this.phone = payload.phone;
  }
}

module.exports = Contact;
