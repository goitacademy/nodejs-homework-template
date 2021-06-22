const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  patchContact,
  updateStatusContact
} = require('../services/contactsService')

const getContactsController = async (req, res, next) => {
  const contacts = await getContacts();
  res.json({contacts})
}

const getContactByIdController = async (req, res, next) => {
  const { id } = req.params
  const contact = await getContactById(id)
  res.json({contact})
}

const postContactController = async (req, res, next) => {
  const { name, email, phone } = req.body
  const newContact = await postContact({ name, email, phone })
  res.json({status: "success", newContact})
}

const deleteContactController = async (req, res, next) => {
  const { id } = req.params
  await deleteContact(id)
  res.status(200).json({ status: "success", message: "contact deleted" })
}

const patchContactController = async (req, res, next) => {
  const { id } = req.params
  const { name, email, phone, favorite } = req.body
  const changedContact = await patchContact({ id, name, email, phone, favorite })
  res.json({ status: "success" }, changedContact)
}

const updateStatusContactController = async (req, res, next) => {
  const { id } = req.params
  const { favorite } = req.body
  if (!favorite) {
    return res.status(400).json({"message": "missing field favorite"})
  }
  await updateStatusContact({ id, favorite })
  res.json({message: "status successfully changed"})
}

module.exports = {
  getContactsController,
  getContactByIdController,
  postContactController,
  deleteContactController,
  patchContactController,
  updateStatusContactController
}
