const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw new NotFound();
  };

  res.status(200).json({
    status: 'success',
    code: 200,
    message: "contact deleted",
    result,
  });
};

module.exports = removeById;