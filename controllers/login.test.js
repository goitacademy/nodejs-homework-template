const { login } = require('./auth');
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

jest.mock('../models/user')
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

// const SECRET_KEY = jest.fn().mockReturnValue('4ds4a4sa55cas55sa5')
const { SECRET_KEY } = process.env;

const req = {
    body: {
        email: 'test@test.de',
        password: 'test1234'
    }
};

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

const next = jest.fn();

describe('Login controller test', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockToken = 'testToken';

    const uncorrectedPassword = 'uncorrectedPassword';

    const mockUser = {
        _id: '123456789123',
        email: 'test@test.de',
        password: 'test1234',
        subscription: 'starter',
        token: '',
        verify: true,
    }

    test(`should should return status code 401, email is't in the DB`, async () => {
        User.findOne = jest.fn().mockResolvedValue(null);

        await expect(login(req, res)).rejects.toThrow(
            res.status(401).json({
                message: 'Email or password is wrong',
            })
        );

        expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Email or password is wrong',
        });
    });

    test(`should should return status code 401, user is't verifier`, async () => {
        User.findOne = jest.fn().mockResolvedValue({ ...mockUser, verify: false });

        await expect(login(req, res)).rejects.toThrow(
            res.status(401).json({
                message: 'Email not verified',
            })
        );
        expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Email not verified'
        });
    });

    test(`should should return status code 401, password is't correct`, async () => {
        User.findOne = jest.fn().mockResolvedValue({ password: uncorrectedPassword, verify: true });

        bcrypt.compare = jest.fn().mockResolvedValue(false);

        await expect(login(req, res)).rejects.toThrow(
            res.status(401).json({
                message: 'Email or password is wrong',
            })
        );

        expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, uncorrectedPassword);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Email or password is wrong',
        });
    });

    test('should return status 200, token, user object with email and subscription', async () => {
        User.findOne = jest.fn().mockResolvedValue(mockUser);

        bcrypt.compare = jest.fn().mockResolvedValue(true);

        jwt.sign = jest.fn().mockReturnValue(mockToken);
        
        User.findByIdAndUpdate = jest.fn();

        await login(req, res, next);

        expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email })
        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockUser.password)
        expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser._id }, SECRET_KEY, { expiresIn: '12h' });
        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(mockUser._id, {
            token: mockToken,
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(typeof res.json.mock.calls[0][0].user.email).toBe('string')
        expect(typeof res.json.mock.calls[0][0].user.subscription).toBe('string')
        expect(res.json).toHaveBeenCalledWith({
            token: mockToken,
            user: {
                email: mockUser.email,
                subscription: mockUser.subscription,
            },
        });
    })
});





