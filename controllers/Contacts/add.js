const { cntModel } = require("../../models/contacts");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = {
    ...req.body,
    owner,
  };
  const contact = await cntModel.create(newContact);
  res.json({
    status: 201,
    data: {
      contact,
    },
  });
};

module.exports = addContact;
