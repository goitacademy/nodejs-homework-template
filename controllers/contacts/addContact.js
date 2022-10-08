const { basedir } = global
const { Contact, schemas } = require(`${basedir}/models/contacts`)
const { createError } = require(`${basedir}/helpers`)

const addContact = async (req, res) => {
  const { error } = schemas.contactAdd.validate(req.body)
  if (error)
    throw createError({
      status: 400,
      message: error.message,
    })
  const { id: owner } = req.user
  const result = await Contact.create({ ...req.body, owner })
  console.log(result)
  res.status(201).json(result)
}

module.exports = addContact