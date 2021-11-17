const contactsControllers = {
  getAll: require('./contacts/getAll'),
  getById: require('./contacts/getById'),
  post: require('./contacts/post'),
  remove: require('./contacts/remove'),
  update: require('./contacts/update')
}

module.exports = contactsControllers
