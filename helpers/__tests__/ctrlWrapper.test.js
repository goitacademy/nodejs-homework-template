/* eslint-disable no-undef */
const ctrlWrapper = require('../ctrlWrapper');

describe('ctrlWraper', () => {
  it('should call the provided controller function and handle errors', async () => {
    const req = { body: { name: 'John Doe' } };
    const res = {};
    const next = jest.fn();
    const mockCtrl = jest.fn().mockResolvedValue('result');

    await ctrlWrapper(mockCtrl(req, res, next));

    expect(mockCtrl).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with the error if the provided controller function throws an error', async () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    const mockCtrl = jest.fn().mockRejectedValue(new Error('Some error'));

    await ctrlWrapper(mockCtrl)(req, res, next);

    expect(mockCtrl).toHaveBeenCalledWith(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error('Some error'));
  });
});
