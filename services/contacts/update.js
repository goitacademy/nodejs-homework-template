const { Contact } = require("../../models/contact");

const update = async (id, body) => {
  return await Contact.findByIdAndUpdate(id, { ...body }, { new: true });
};
module.exports = update;
