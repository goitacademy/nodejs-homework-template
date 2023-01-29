const { Contact } = require("../../models/modelContact");

const getContactById = async (contactId) => {
  try {
    const data = await Contact.findById(contactId);
    return data;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getContactById,
};
