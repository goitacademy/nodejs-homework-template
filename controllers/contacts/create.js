const {Contact} = require('../../model/contactSchema');
const {HttpError} = require('../../helpers')

const create = async (req, res) => {
  const {_id: owner} = req.user
  const result = await Contact.create({...req.body, owner });
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