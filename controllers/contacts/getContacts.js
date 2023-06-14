const {Contact} = require('../../models')
const { wrapper } = require("../../helpers");

const getContacts = async (req, res) => {

  const result = await Contact.find()

  res.json(result);
};

module.exports = wrapper(getContacts);
