/* eslint-disable no-undef */
const { Contact } = require('../../../models/contact');
const updateById = require('../updateById');

describe('updateById', () => {
  it('should update the contact if it exists', async () => {
    const req = {
      params: { contactId: '123456' },
      body: { name: 'John Doe' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFindByIdAndUpdate = jest
      .spyOn(Contact, 'findByIdAndUpdate')
      .mockResolvedValue('updatedContact');

    await updateById(req, res);

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      '123456',
      { name: 'John Doe' },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith('updatedContact');
  });

  it('should throw 404 error if the contact does not exist', async () => {
    const req = {
      params: { contactId: '123456' },
      body: { name: 'John Doe' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFindByIdAndUpdate = jest
      .spyOn(Contact, 'findByIdAndUpdate')
      .mockResolvedValue(null);

    try {
      await updateById(req, res);
    } catch (error) {
      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        '123456',
        { name: 'John Doe' },
        { new: true }
      );
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(error.status).toBe(404);
      expect(error.message).toBe('Not found');
    }
  });
});
