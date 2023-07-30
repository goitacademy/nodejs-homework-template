const {Contact} = require("../../models/contact")

const {ControllerWrapper} = require("../../utils/index");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);    
};

module.exports = ControllerWrapper(listContacts);