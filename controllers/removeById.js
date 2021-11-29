const { Contact } = require('../model/contact');

const removeById = async (req, res) => {
  const result = await Contact.deleteOne({ _id: req.params.contactId });

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result },
  });
};

module.exports = removeById;
