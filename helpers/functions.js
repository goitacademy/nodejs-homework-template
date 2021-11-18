const getMaxId = contacts => {
  let maxId = 0
  contacts.forEach(({ id }) => {
    if (id > maxId) maxId = id
  })
  return maxId
}

const checkNewContact = ({ name, email, phone }, contacts, skipId = null) => {
  let result = true
  let message = ''
  contacts.forEach(contact => {
    if (contact.id !== skipId) {
      if (contact.name === name) {
        message = 'Error. This name - ' + name + ' already exists'
        result = false
      }
      if (contact.email === email) {
        console.log(contact.id)
        message = 'Error. This email - ' + email + ' already exists'
        result = false
      }
      if (contact.phone === phone) {
        message = 'Error. This phone - ' + phone + ' already exists'
        result = false
      }
    }
  })
  return { result, message }
}

const phoneToString = phone => {
  return '(' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) + '-' + phone.slice(6, 10)
}

module.exports = {
  getMaxId,
  checkNewContact,
  phoneToString,
}
