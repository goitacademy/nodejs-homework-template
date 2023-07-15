const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const HttpError = require('../helpers/HttpError');
const login = require('../controllers/auth/login');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../models/user');

describe('Login Controller', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };

        res = {
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return 200 status, token, and user object with email and subscription', async () => {
        const mockedToken = 'mocked_token';
        const mockedUser = {
            _id: 'user_id',
            email: 'test@example.com',
            subscription: 'basic',
        };

        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue(mockedToken);
        User.findOne.mockResolvedValue(mockedUser);
        User.findByIdAndUpdate.mockResolvedValue();

        await login(req, res);

        expect(res.json).toHaveBeenCalledWith({
            token: mockedToken,
        });

        expect(res.json).toHaveBeenCalledTimes(1);
    });

    test('should throw 401 error when email or password is invalid', async () => {
        bcrypt.compare.mockResolvedValue(false);
        User.findOne.mockResolvedValue(null);
        const expectedError = HttpError(401, 'Email or password invalid');

        await expect(async () => {
            await login(req, res);
        }).rejects.toThrow(expectedError);

        expect(res.json).not.toHaveBeenCalled();
    });
});
