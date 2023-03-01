const { Contacts } = require("../../db/contacts");
const updateContactById = async (contactId, body) => {
  const data = await Contacts.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
  console.log(data);
  return data;
};
module.exports = updateContactById;
