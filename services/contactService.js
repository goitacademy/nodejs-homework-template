const { Contact } = require("../models");

async function createContact(body) {
  return Contact.create(body);
}

module.exports = {
  createContact,
};
