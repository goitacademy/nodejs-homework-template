const { basedir } = global
const { Contact, schemas } = require(`${basedir}/models/contacts`)
const { createError } = require(`${basedir}/helpers`)

const updateContactById = async (req, res) => {
  const { error } = schemas.contactAdd.validate(req.body)
  if (error)
    throw createError({
      status: 400,
      message: error.message,
    })

  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })
  if (!result) throw createError({ status: 404 })
  res.json(result)
}

module.exports = updateContactById