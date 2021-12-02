const { Post } = require('../db/postModel')

const listContacts = async (userId) => {
  const contacts = await Post.find({ owner: userId })
  return contacts
}
const getContactById = async (contactId, userId) => {
  const contact = await Post.find({ _id: contactId, owner: userId })
  if (Object.keys(contact).length === 0) { return undefined }
  return contact
}

const removeContact = async (contactId, userId) => {
  const contact = await getContactById(contactId, userId)
  if (!contact) { return undefined }
  await Post.findByIdAndRemove(contactId)
  return contact
}

const addContact = async (body, userId) => {
  const { name, email, phone } = body
  const post = new Post({ name, email, phone, owner: userId })
  await post.save()
  return body
}

const updateContact = async (contactId, body, userId) => {
  const contact = await getContactById(contactId, userId)
  if (!contact) { return undefined }
  const { name, email, phone } = body
  await Post.findByIdAndUpdate(contactId, { $set: { name, email, phone } })
  return body
}

const updateFavoriteContact = async (contactId, body, userId) => {
  const contact = await getContactById(contactId, userId)
  if (!contact) { return undefined }
  const { name, email, phone, favorite } = body
  let isFavorite = true
  if (favorite === void 0 || favorite === true) { isFavorite = true } else { isFavorite = false }
  await Post.findByIdAndUpdate(contactId, { $set: { name, email, phone, favorite: isFavorite } })
  return { name, email, phone, favorite: isFavorite }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteContact,
}
