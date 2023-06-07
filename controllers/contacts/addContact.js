const {Contact} = require('../../schemas/contact');
const {HttpError} = require("../../helpers/httpError");
const ctrlWrapper = require("../../decorators/ctrlWrapper");

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
    const { error } = req.body;
    if (error) {
      throw HttpError(400, `Missing required name field`)
    }
    const result = await Contact.create({ name, email, phone})
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact: result },
    })
}

module.exports = {
  create: ctrlWrapper(create)
}