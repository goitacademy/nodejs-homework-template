const { Contact } = require("../../models/contact");

const updateStatus = async (id, favorite) => {
  return await Contact.findByIdAndUpdate(id, { favorite }, { new: true });
};

module.exports = updateStatus;
