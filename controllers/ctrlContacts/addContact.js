const { contactsService } = require("../../services");

const addContact = async (req, res) => {
  const {
    body,
    user: { _id: owner },
  } = req;

  const result = await contactsService.addContact({ ...body, owner });

  res.status(201).json(result);
};

module.exports = addContact;