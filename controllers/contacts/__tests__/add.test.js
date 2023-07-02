/* eslint-disable no-undef */
const { Contact } = require('../../../models/contact');
const add = require('../add');

describe('contacts add ctrl', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new contact and return the results', async () => {
    const req = {
      user: {
        _id: '123456',
      },
      body: {
        name: 'Grisha',
        email: 'grisha@test.co',
        phone: '555-55-55',
        favorite: false,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    const mockCreate = jest
      .spyOn(Contact, 'create')
      .mockResolvedValue(req.body);

    await add(req, res, next);

    expect(mockCreate).toHaveBeenCalledWith({
      ...req.body,
      owner: req.user._id,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });
});
