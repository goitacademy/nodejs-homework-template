/* eslint-disable no-undef */
const { Contact } = require('../../../models/contact');
const getById = require('../getById');

describe('getById', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the contact if it exists', async () => {
    const req = {
      params: { contactId: '123456' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFindById = jest
      .spyOn(Contact, 'findById')
      .mockResolvedValue('contact');

    await getById(req, res);

    expect(mockFindById).toHaveBeenCalledWith('123456');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith('contact');
  });

  it('should throw 404 error if the contact does not exist', async () => {
    const req = {
      params: { contactId: '123456' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFindById = jest
      .spyOn(Contact, 'findById')
      .mockResolvedValue(null);

    try {
      await getById(req, res);
    } catch (error) {
      expect(mockFindById).toHaveBeenCalledWith('123456');
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(error.status).toBe(404);
      expect(error.message).toBe('Not found');
    }
  });
});
