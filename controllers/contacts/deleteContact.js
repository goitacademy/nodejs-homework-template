const {Contact} = require('../../schemas/contact');
const {HttpError} = require("../../helpers");
const {ctrlWrapper} = require("../../decorators");

const remove = async (req, res, next) => {
  const { id } = req.params
    const result = await Contact.findByIdAndRemove({ _id: id })
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
  remove: ctrlWrapper(remove)
}