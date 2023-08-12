const Contact = require("../models/contact.model");

const getAllContacts = async (query) => {
    console.log("jestem");
     return Contact.find(query);
};

module.exports = { getAllContacts }
