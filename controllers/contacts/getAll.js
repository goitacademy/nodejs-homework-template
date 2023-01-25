const contactsOperations = require("../../models/contacts");

const getAll = async (req, res) => {
    const contacts = await contactsOperations.getAll();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      }
    });
}

module.exports = getAll;