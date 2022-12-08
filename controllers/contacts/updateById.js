const Contact = require('../../models/contactModel')
const { HttpError } = require('../../helpers/HttpErrors')
const addScheme = require('../../schemas/contactSchema')

const updateById = async (req, res, next) => {
  try {
    const { error } = addScheme.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }

    const { contactId } = req.params

    const result = await Contact.updateOne({_id: contactId}, req.body)
    if (result.modifiedCount === 0) {
      throw HttpError(404, "Not found")
    }
console.log("res", result)
    const updatedContact = await Contact.findOne({_id: contactId})
//что вернуть??? сейчас:
// const result = {
//   acknowledged: true,
//   modifiedCount: 0,
//   upsertedId: null,
//   upsertedCount: 0,
//   matchedCount: 1
// }
    res.json(updatedContact)
  } catch (err) {
    next()
  }
}

module.exports = updateById