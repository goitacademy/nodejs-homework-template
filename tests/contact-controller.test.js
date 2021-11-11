const { changePosts } = require('../controllers/controllerContacts');
const Contacts = require('../repository/contacts');
const { CustomError } = require('../helpers/customError');
const { HttpCode } = require('../config/constants');

jest.mock('../repository/contacts');

describe('Unit test controller changePostsContact', () => {
  let req, res, next;

  beforeEach(() => {
    Contacts.updateContact = jest.fn();
    req = {
      params: { contactId: 123 },
      body: {},
      user: { _id: 12 },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(data => data),
    };
    next = jest.fn();
  });

  it('Contact exist', async () => {
    const contact = { contactId: 123, favorite: true };
    Contacts.updateContact = jest.fn(() => {
      return { contactId: 123, favorite: true };
    });

    const result = await changePosts(req, res, next);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('code');
    expect(result).toHaveProperty('data');
    expect(result.data.contact).toEqual(contact);
  });

  it('Contact not exist', async () => {
    await expect(changePosts(req, res, next)).rejects.toEqual(
      new CustomError(HttpCode.NOT_FOUND, 'Contact not found'),
    );
  });
});
