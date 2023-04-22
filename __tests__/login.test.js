const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { login } = require('../controllers/auth');
const { User } = require('../models/users');

describe('Auth login test', () => {
    it('should respond with token and user object', async () => {
        const email = 'test@example.com';
        const password = 'password';
        const subscription = 'starter';
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            _id: 'user-id',
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
    it('should respond with error for invalid email', async () => {
    const email = 'wrongemail@example.com';
    const password = 'password';

    jest.spyOn(User, 'findOne').mockResolvedValue(null);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    jest.spyOn(jwt, 'sign').mockReturnValue('test-token');
    jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValue({});

    const req = { body: { email, password } };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    const next = jest.fn();

    try {
        await login(req, res, next);
    } catch (err) {
        expect(res.status).toHaveBeenCalledWith(401); 
        expect(res.json).toHaveBeenCalledWith({ message: 'Email or password is invalid' });
        expect(next).not.toHaveBeenCalled();
    }
    });
    it('should respond with error for invalid password', async () => {
        const email = 'test@example.com';
        const password = 'wrongpassword';
        const subscription = 'starter';

        const user = new User({
            _id: 'user-id',
            email,
            subscription,
            password: await bcrypt.hash('password', 10),
        });

        jest.spyOn(User, 'findOne').mockResolvedValue(user);
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(false); 
        jest.spyOn(jwt, 'sign').mockReturnValue('test-token');
        jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValue({});

        const req = { body: { email, password } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        try {
            await login(req, res, next);
        } catch (err) {
            expect(res.status).toHaveBeenCalledWith(401); 
            expect(res.json).toHaveBeenCalledWith({ message: 'Email or password is invalid' }); 
            expect(next).not.toHaveBeenCalled(); 
        }
    });
});