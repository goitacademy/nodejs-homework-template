const { Contact } = require('../model/contact');

const putById = async (req, res) => {
  const result = await Contact.updateOne({ _id: req.params.contactId }, { ...req.body });

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = putById;
