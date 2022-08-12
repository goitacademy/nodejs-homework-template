const { Contact } = require("../../models");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      updatedContact,
    },
  });
};

module.exports = updateById;
