const { loginUser } = require('./adapters/express/api/users'); // Імпортуємо вашу функцію loginUser
const userService = require('./services/users'); // Імпортуємо ваш модуль userService
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors'); // Імпортуємо функцію createError
// Мокуємо залежності
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('./services/users');

describe('Функція входу користувача', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('має увійти користувача з правильними обліковими даними', async () => {
    // Мокуємо відповідь від userService.findUser
    const user = {
      _id: '6512515e90c2654dd09ab513',
      email: 'fwafsaw@gmail.com',
      avatarURL: 'avatars\badcat.jpg',
      subscription: 'starter'
    };
    userService.findUser.mockResolvedValue([user]);

    // Мокуємо відповідь від bcrypt.compare
    bcrypt.compare.mockResolvedValue(true);

    // Мокуємо відповідь від jwt.sign
    jwt.sign.mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTEyNTE1ZTkwYzI2NTRkZDA5YWI1MTMiLCJpYXQiOjE2OTU3NTgzMzEsImV4cCI6MTY5NTc2MTkzMX0.P60sETZ_SZFpvzIlnreLxVsXgz4vvl3RPk6IRfV81U8');

    const req = {
      body: {
        email: 'fwafsaw@gmail.com',
        password: 'fwafawfawfwa22eF',
      },
    };
    const res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await loginUser(req, res, next);
    expect(userService.findUser).toHaveBeenCalledWith('fwafsaw@gmail.com');
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({data:{
      token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTEyNTE1ZTkwYzI2NTRkZDA5YWI1MTMiLCJpYXQiOjE2OTU3NTgzMzEsImV4cCI6MTY5NTc2MTkzMX0.P60sETZ_SZFpvzIlnreLxVsXgz4vvl3RPk6IRfV81U8',
      user
    }})
    });
});
