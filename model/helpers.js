const generateId = (contacts) => {
  return contacts.length > 0 ? (contacts[contacts.length - 1].id + 1) : 1
}

module.exports = {
  generateId
}
