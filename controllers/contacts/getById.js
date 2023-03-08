const {Contact} = require('../../model/contactSchema');
const {HttpError} = require('../../helpers')

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Not found contact by ${id} id`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: `we find contact with ${id} id`,
    data: result,
  });
}

module.exports = getById