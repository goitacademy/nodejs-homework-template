const { Contact } = require("../models/contact");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  res.status(200).json(result);
};

module.exports = updateById;
