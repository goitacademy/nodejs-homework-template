const Contact = require("../../models/contact");

const getContacts = async (_, res) => {
  const contacts = await Contact.find({}, "-createdAt, -updatedAt");

  res.json({
    status: "success",
    code: 200,
    message: "Contacts found",
    data: {
      contacts,
    },
  });
};

module.exports = getContacts;
