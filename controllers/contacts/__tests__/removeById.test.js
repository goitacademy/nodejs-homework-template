/* eslint-disable no-undef */
const { Contact } = require('../../../models/contact');
const removeById = require('../removeById');

describe('removeById', () => {
  it('should delete the contact if it exists', async () => {
    const req = {
      params: { contactId: '123456' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFindByIdAndDelete = jest
      .spyOn(Contact, 'findByIdAndDelete')
      .mockResolvedValue('deletedContact');

    await removeById(req, res);

    expect(mockFindByIdAndDelete).toHaveBeenCalledWith('123456');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'contact deleted' });
  });

  it('should throw 404 error if the contact does not exist', async () => {
    const req = {
      params: { contactId: '123456' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFindByIdAndDelete = jest
      .spyOn(Contact, 'findByIdAndDelete')
      .mockResolvedValue(null);

    try {
      await removeById(req, res);
    } catch (error) {
      expect(mockFindByIdAndDelete).toHaveBeenCalledWith('123456');
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(error.status).toBe(404);
      expect(error.message).toBe('Not found');
    }
  });
});
