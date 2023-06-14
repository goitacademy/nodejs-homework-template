const { wrapper } = require("../../helpers");

const getContactById = (req, res) => {
  const { contact } = req;

  res.json(contact);
};

module.exports = wrapper(getContactById);
