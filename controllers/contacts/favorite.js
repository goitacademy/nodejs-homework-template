const {Contact} = require('../../model/contactSchema');
const {HttpError} = require('../../helpers')

const favorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json({
    status: "seccess",
    code: 200,
    message: `Contact with id ${id} update success`,
    data: result
  });
}

module.exports = favorite