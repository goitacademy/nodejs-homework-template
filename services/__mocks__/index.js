const { contacts } = require('./data-contacts')

const mockGetAll = jest.fn(() => {
  return { contacts, total: contacts.length, limit: 5, offset: 0 }
})

const mockGetById = jest.fn((userId, { id }) => {
  const [contact] = contacts.filter((el) => String(el._id) === String(id))
  return contact
})

const mockCreate = jest.fn((userId, body) => {
  contacts.push({ ...body, _id: '5f8382425ba83a4f1829ca4f' })
  return { ...body, _id: '5f8382425ba83a4f1829ca4f' }
})

const mockUpdate = jest.fn((userId, { id }, body) => {
  const [contact] = contacts.filter((el) => String(el._id) === String(id))
  if (contact) {
    contact.name = body.name
  }
  return contact
})

const mockRemove = jest.fn((userId, { id }) => {
  const index = contacts.findIndex((el) => String(el._id) === String(id))
  if (index !== -1) {
    const [contact] = contacts.splice(index, 1)
    return contact
  }
  return null
})

const ContactsService = jest.fn().mockImplementation(() => {
  return {
    getAll: mockGetAll,
    getById: mockGetById,
    create: mockCreate,
    update: mockUpdate,
    remove: mockRemove,
  }
})

const UsersService = jest.fn().mockImplementation(() => {
  return {
    create: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    updateAvatar: jest.fn(),
  }
})

const AuthService = jest.fn().mockImplementation(() => {
  return {
    login: jest.fn(),
    logout: jest.fn(),
  }
})

module.exports = {
  ContactsService,
  UsersService,
  AuthService,
}
