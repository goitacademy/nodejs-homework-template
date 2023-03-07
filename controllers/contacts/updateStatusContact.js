const { Contact } = require("../../models/contact");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.updateOne({ _id: contactId }, req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = updateStatusContact;
