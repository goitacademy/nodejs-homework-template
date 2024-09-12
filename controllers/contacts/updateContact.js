const { Contact } = require("../../models/contact");

const updateContact = async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  const result = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!result) {
    const error = new Error(`Not found`);
    error.status = 404;
    throw error;
  }
  res.status(200).json(result);
};

module.exports = updateContact;
