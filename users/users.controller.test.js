const {
  signupHandler,
  loginHandler,
//   logoutHandler,
//   currentHandler,
} = require('./yourControllerFile'); // Import kontrolerów do testów
const userDao = require('./users.dao'); // Import userDao (uwaga: import zależy od struktury Twojego projektu)

// Testy dla signupHandler
describe('signupHandler', () => {
  it('powinien zwrócić token i obiekt user z odpowiednimi polami', async () => {
    // Mockowanie zapytania i odpowiedzi HTTP
    const req = {
      body: {
        email: 'test@example.com',
        password: 'testpassword',
      },
    };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
    const next = jest.fn();

    // Wywołanie kontrolera
    await signupHandler(req, res, next);

    // Sprawdzenie czy status odpowiedzi jest 201
    expect(res.status).toHaveBeenCalledWith(201);

    // Sprawdzenie czy funkcja send została wywołana z poprawnymi danymi
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
      user: expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      }),
    }));
  });
});

// Testy dla loginHandler
describe('loginHandler', () => {
  it('powinien zwrócić token i obiekt user z odpowiednimi polami', async () => {
    // Mockowanie zapytania i odpowiedzi HTTP
    const req = {
      body: {
        email: 'test@example.com',
        password: 'testpassword',
      },
    };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
    const next = jest.fn();

    // Mockowanie odpowiedzi z bazy danych
    userDao.getUser = jest.fn().mockResolvedValue({
      _id: 'userId',
      email: 'test@example.com',
      subscription: 'basic',
      validatePassword: jest.fn().mockResolvedValue(true), // Mockowanie poprawnego hasła
    });

    // Wywołanie kontrolera
    await loginHandler(req, res, next);

    // Sprawdzenie czy status odpowiedzi jest 200
    expect(res.status).toHaveBeenCalledWith(200);

    // Sprawdzenie czy funkcja send została wywołana z poprawnymi danymi
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
      user: expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      }),
      token: expect.any(String),
    }));
  });
});

