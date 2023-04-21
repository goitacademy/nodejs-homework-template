const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { login } = require('../controllers/auth');
const { User } = require('../models/users');


describe('Auth login test', () => {
    it('should respond with token and user object', async () => {
        const _id = 'user-id';
        const email = 'test@example.com';
        const password = 'password';
        const subscription = 'free';
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            _id,
            email,
            subscription,
            password: hashedPassword,
        });
        const token = 'test-token';

        jest.spyOn(User, 'findOne').mockResolvedValue(user);
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
        jest.spyOn(jwt, 'sign').mockReturnValue(token);
        jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValue({});

        const req = { body: { email, password } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        await login(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            token: expect.any(String),
            user: {
                email: expect.any(String),
                subscription: expect.any(String),
            },
        });
    });
});