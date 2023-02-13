const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = updateStatusContact;
