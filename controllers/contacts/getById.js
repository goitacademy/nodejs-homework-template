const contacts = require("../../models/contacts.json");

const getContactById = async (req, res) => {
  const contact = contacts.find(({ id }) => id === req.params.contactId);
  if (!contact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({
    ststus: "succses",
    code: 200,
    data: contact,
  });
};
module.exports = getContactById;
