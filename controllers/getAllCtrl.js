const { contacts } = require("../models/contacts");

const getAllCtrl = async (req, res) => {
  const contactsList = await contacts.listContacts();
  res.json({
    status: "Success",
    code: 200,
    data: {
      result: contactsList,
    },
  });
};

module.exports = getAllCtrl;
