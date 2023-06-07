const {Contact} = require('../../schemas/contact');
const {HttpError} = require("../../helpers");
const {ctrlWrapper} = require("../../decorators");

const updateFavorite = async (req, res, next) => {
  const { id } = req.params
    const { error } = req.body;
  if (error) {
      throw HttpError(400, 'Missing required name field')
    }
    const result = await Contact.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      throw HttpError(404, `Not found contact id: ${id}`)
    }
}

module.exports = {
  updateFavorite: ctrlWrapper(updateFavorite)
}