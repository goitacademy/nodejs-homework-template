const contacts = require('./contacts')
const { HttpCode } = require('../helpers/constants')
const { ContactsService } = require('../services')
const { contacts: fakeData, newContact } = require('../services/__mocks__/data-contacts')

jest.mock('../services')

describe('Unit testing contact controllers', () => {
  let req, res, next
  beforeEach(() => {
    req = { user: { id: 1 } }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    }
    next = jest.fn()
  })

  test('should get all contacts', async () => {
    const result = await contacts.getAll(req, res, next)
    expect(ContactsService).toHaveBeenCalled()
    expect(result.data).toBeDefined()
    expect(result).toHaveProperty('status', 'success')
    expect(result).toHaveProperty('code', 200)
    expect(result).toHaveProperty('data')
  })

  test('should get error when get all contacts', async () => {
    const result = await contacts.getAll({}, res, next)
    expect(next).toHaveBeenCalledTimes(1)
  })

  test('should found contact by id', async () => {
    const { _id, name, email, phone } = fakeData[0]
    req.params = { id: _id }
    const result = await contacts.getById(req, res, next)
    expect(ContactsService).toHaveBeenCalled()
    expect(result).toBeDefined()
    expect(result.data.contact).toHaveProperty('_id', _id)
    expect(result.data.contact).toHaveProperty('name', name)
    expect(result.data.contact).toHaveProperty('email', email)
    expect(result.data.contact).toHaveProperty('phone', phone)
  })

  test('should found contact by wrong id', async () => {
    req.params = { id: 1 }
    const result = await contacts.getById(req, res, next)
    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith({
      status: HttpCode.NOT_FOUND,
      message: 'Not found contact',
      data: 'Not Found',
    })
  })

  it('should create new contact', async () => {
    const { name, email, phone } = newContact
    req.body = newContact
    const result = await contacts.create(req, res, next)
    expect(ContactsService).toHaveBeenCalled()
    expect(result).toBeDefined()
    expect(result.data.contact).toHaveProperty('_id')
    expect(result.data.contact).toHaveProperty('name', name)
    expect(result.data.contact).toHaveProperty('email', email)
    expect(result.data.contact).toHaveProperty('phone', phone)
  })

  it('should update contact', async () => {
    const { _id } = fakeData[0]
    req.params = { id: _id }
    const name = 'UpdateContact'
    req.body = { name }
    const result = await contacts.update(req, res, next)
    expect(ContactsService).toHaveBeenCalled()
    expect(result).toBeDefined()
    expect(result.data.contact).toHaveProperty('_id', _id)
    expect(result.data.contact).toHaveProperty('name', name)
  })

  it('should update contact by wrong id', async () => {
    req.params = { id: 1 }
    const name = 'UpdateContact'
    req.body = { name }
    const result = await contacts.update(req, res, next)
    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith({
      status: HttpCode.NOT_FOUND,
      message: 'Not found contact',
      data: 'Not Found',
    })
  })

  it('should remove contact by id', async () => {
    const { _id, name, email } = fakeData[0]
    req.params = { id: _id }
    const result = await contacts.remove(req, res, next)
    expect(ContactsService).toHaveBeenCalled()
    expect(result).toBeDefined()
    expect(result.data.contact).toHaveProperty('_id', _id)
    expect(result.data.contact).toHaveProperty('name', name)
    expect(result.data.contact).toHaveProperty('email', email)
  })

  it('should remove contact by wrong id', async () => {
    req.params = { id: 1 }
    const result = await contacts.remove(req, res, next)
    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith({
      status: HttpCode.NOT_FOUND,
      message: 'Not found contact',
      data: 'Not Found',
    })
  })
})
