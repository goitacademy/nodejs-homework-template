const { Contact } = require("../../models");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    res.status(404).json(`Not found`);
  }
  res.status(200).json({ result });
};

module.exports = updateContactById;
