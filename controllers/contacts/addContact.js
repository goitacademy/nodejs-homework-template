const { ContactsModel } = require("../../models");

const addContact = async (req, res) => {
  const newContact = await ContactsModel.create({ ...req.body });

  if (!newContact) {
    res.status(400);
    throw new Error("Unable to create contact");
  }

  res.json({
    status: "created",
    code: 201,
    data: newContact,
  });
};

module.exports = addContact;
