const contactSchema = require("../../models/contactSchema");
const { ctrlWrapper } = require("../../helpers/index");
const getListContact = async (req, res) => {
  const result = await contactSchema.find();
  res.json(result);
};

module.exports = {getListContact: ctrlWrapper(getListContact)}