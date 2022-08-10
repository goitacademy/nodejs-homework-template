const mongoose = require('mongoose');
const request = require('supertest'); // імітує запити на бекенд

const app = require('../../app'); // імпортуєм весь сервер
const { User } = require('../../models/user');
const { DB_TEST_HOST, PORT = 3000 } = process.env; // створити тестову DB в MongoDB

describe('test auth routes', () => {
  let server;
  beforeAll(() => (server = app.listen(PORT))); // запуск сервера перед тестами
  afterAll(() => server.close()); // зупиняє серевер після тестів

  beforeEach(done => {
    // jest.setTimeout(6000);
    mongoose.connect(DB_TEST_HOST).then(() => done()); // перед кожним тестом підключаємось до тест.бази
  });

  afterEach(done => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done()); // після кожного тесту видаляєм колекцію
    });
  });

  // Тест: спочатку ств. нового користувача(user) і збер. в базі (в колекції users)
  test('test login route', async () => {
    const newUser = {
      email: 'natalitest1@gmail.com',
      password: '1234567',
    };
    const user = await User.create(newUser); // збер.в базі

    const loginUser = {
      email: 'natalitest1@gmail.com',
      password: '1234567',
    };
    // 1.відповідь повина мати статус-код 200
    const response = await request(app).post('/api/auth/login').send(loginUser);
    // const response = await request(app).post('/login').send(loginUser);
    expect(response.statusCode).toBe(200);

    // 2. у відповіді повинен повертатися токен
    const { body } = response;
    expect(body.token).toByTruthy(); // перев. чи є поле токен в тілі

    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token); // перев. чи зберегли в базі токен

    // 3. у відповіді повинен повертатися об'єкт user
    //    з 2 полями email та subscription з типом даних String
  });
});
