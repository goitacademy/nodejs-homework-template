const getMaxId = contacts => {
  let maxId = 0
  contacts.forEach(({ id }) => {
    if (id > maxId) maxId = id
  })
  return maxId
}

const checkNewContact = ({ name, email, phone }, contacts) => {
  let result = true
  let message = ''
  contacts.forEach(contact => {
    if (contact.name === name) {
      message = 'Error. This name - ' + name + ' already exists'
      result = false
    }
    if (contact.email === email) {
      message = 'Error. This email - ' + email + ' already exists'
      result = false
    }
    if (contact.phone === phone) {
      message = 'Error. This phone - ' + phone + ' already exists'
      result = false
    }
  })
  if (message) console.log(message)
  return { result, message }
}

module.exports = {
  getMaxId,
  checkNewContact,
}
