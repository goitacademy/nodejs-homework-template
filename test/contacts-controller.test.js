const { updateContact } = require('../controllers/contacts');
const Contacts = require('../repository/contacts');
const { HttpCode, ResponseStatus } = require('../config/constants');
const { customError } = require('../helpers/customError');
const CustomError = require('../helpers/customError');

jest.mock('../repository/contacts');

describe('Unit test for contact controller <updateContact>', function () {
  let req, res;

  beforeEach(() => {
    req = { params: { id: 3 }, body: {}, user: { _id: 1 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(data => data),
    };
    Contacts.updateContact = jest.fn();
  });

  it('Contact exists', async () => {
    const contact = {
      _id: 10,
      name: 'test',
      email: 'test@gmail.com',
      owner: req.user._id,
    };

    Contacts.updateContact = jest.fn(() => {
      return contact;
    });

    const result = await updateContact(req, res);

    expect(result).toBeDefined();
    expect(result.status).toEqual(ResponseStatus.SUCCESS);
    expect(result.code).toEqual(HttpCode.OK);
    expect(result).toHaveProperty('data');
    expect(result.data.contact).toEqual(contact);
  });

  it('Contact does not exist v 1.0', async () => {
    await expect(updateContact(req, res)).rejects.toEqual(
      new CustomError(HttpCode.NOT_FOUND, 'Not found'),
    );
  });

  it('Contact does not exist v 1.1', () => {
    return updateContact(req, res).catch(err => {
      expect(err.status).toEqual(HttpCode.NOT_FOUND);
      expect(err.message).toEqual('Not found');
    });
  });
});
