/* eslint-disable no-undef */
const { Contact } = require('../../../models/contact');
const updateStatusContact = require('../updateStatusContact');

describe('updateStatusContact', () => {
  it('should update the contact status if it exists and favorite field is provided', async () => {
    const req = {
      params: { contactId: '123456' },
      body: { favorite: true },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFindByIdAndUpdate = jest
      .spyOn(Contact, 'findByIdAndUpdate')
      .mockResolvedValue('updatedContact');

    await updateStatusContact(req, res);

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      '123456',
      { favorite: true },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith('updatedContact');
  });

  it('should throw 404 error if the contact does not exist', async () => {
    const req = {
      params: { contactId: '123456' },
      body: { favorite: true },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFindByIdAndUpdate = jest
      .spyOn(Contact, 'findByIdAndUpdate')
      .mockResolvedValue(null);

    try {
      await updateStatusContact(req, res);
    } catch (error) {
      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        '123456',
        { favorite: true },
        { new: true }
      );
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(error.status).toBe(404);
      expect(error.message).toBe('Not found');
    }
  });
});
