const {Contact} = require('../../model/contactSchema');
const {HttpError} = require('../../helpers')

const create = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const result = await Contact.create({ name, email, phone, favorite });
    if (!result) {
      throw HttpError(404, `Not created`);
  }
  res.status(201).json({
    status: 'success',
    code: 201,
    message: `contact with ${result.name} name is created`,
    data: result
  });
}

module.exports = create;