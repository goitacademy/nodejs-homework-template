const { Contacts } = require("../../models/contact");
const { RequesError } = require("../../helpers");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequesError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateById;
