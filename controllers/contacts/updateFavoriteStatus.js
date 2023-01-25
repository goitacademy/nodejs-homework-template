const { NotFound } = require("http-errors")

const { Contact } = require("../../models/index")

const updateFavoriteStatus = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
  if (!result) {
    throw new NotFound(`Contact with id ${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = updateFavoriteStatus;