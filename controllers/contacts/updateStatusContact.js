const { Contact } = require("../../models");
const { HttpError, wrapper } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  console.log("req.params - ", req.params);
  console.log("req.body - ", req.body);
  console.log("result - ", result);

  res.json(result);
};

module.exports = wrapper(updateStatusContact);
