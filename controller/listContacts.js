const ContactsModel = require("../model");

const listContacts = async (req, res) => {
  try {
    console.log(1);
    const contacts = await ContactsModel.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = listContacts;
