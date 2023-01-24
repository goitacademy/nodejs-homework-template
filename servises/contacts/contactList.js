const { Contact } = require("../../models/modelContact");

const listContacts = async () => {
  try {
    const data = await Contact.find({});

    return data;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  listContacts,
};
