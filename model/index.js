const { Post } = require('../db/postModel')

const listContacts = async () => {
  const contacts = await Post.find({})
  return contacts
}
const getContactById = async (contactId) => {
  const contact = await Post.findById(contactId)
  return contact
}

const removeContact = async (contactId) => {
  const contact = await getContactById(contactId)
  await Post.findByIdAndRemove(contactId)
  return contact
}

const addContact = async (body) => {
  const { name, email, phone } = body
  const post = new Post({ name, email, phone })
  await post.save()
  return body
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body
  await Post.findByIdAndUpdate(contactId, { $set: { name, email, phone } })
  return body
}

const updateFavoriteContact = async (contactId, body) => {
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
