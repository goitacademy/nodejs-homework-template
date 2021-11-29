const { Contact } = require('../model/contact');

const getById = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findById(id);

  if (!result) throw new NotFound(`The contact with id ${id} was not found`);

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getById;
