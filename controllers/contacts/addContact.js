const { ContactsModel } = require("../../models");

const addContact = async (req, res) => {
  const { id } = req.user;
  const newContact = await ContactsModel.create({ ...req.body, owner: id });

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
