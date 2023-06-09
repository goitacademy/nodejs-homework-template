const { wrapper } = require("../../helpers");
const { addContact } = require("../../models/contacts");

const add = async (req, res) => {

  const result = await addContact(req.body);

  res.status(201).json(result);
};

module.exports = wrapper(add);
