const { Contact } = require("../../models/contact");

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  res.json(result);
};
module.exports = updateContactById;
