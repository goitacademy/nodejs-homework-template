const { Contact } = require("../../models");
const updateContactById = async (contactId, body, owner) => {
  const data = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { ...body },
    { new: true }
  );
  return data;
};
module.exports = updateContactById;
