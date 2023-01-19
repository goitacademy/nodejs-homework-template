const { Contacts } = require("../model/contact");

const getContacts = async (req, res) => {
  const contacts = await Contacts.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = {
  getContacts,
};
