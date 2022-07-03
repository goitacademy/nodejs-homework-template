const { Conflict } = require('http-errors');
const { HttpStatusCode } = require('../../libs');
const { usersController } = require('./');
const { authService } = require('../../service/auth');
// const jwt = require('jsonwebtoken');

describe('Unit test registration / signup', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    console.log('Выполнить в начале каждого теста');
    mockReq = { body: { name: 'username', email: 'test@test.com', password: '12345678' } };
    // цепочная функция mockReturnThis; возвращает this тогоже  обьекта и у него будет json jest fn
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn(data => data) };
    mockNext = jest.fn();
    authService.createUser = jest.fn(async data => data);
  });

  test('SignUp new User should register with email', async () => {
    authService.isUserExist = jest.fn(async () => false);
    await usersController.signupUser(mockReq, mockRes, mockNext);
    expect(authService.isUserExist).toHaveBeenCalledWith(mockReq.body.email);
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatusCode.CREATED);
  });

  test('SignUp already exist User, should call next() with error', async () => {
    const isUserExist = (authService.isUserExist = jest.fn(async () => true));
    await usersController.signupUser(mockReq, mockRes, mockNext);
    expect(isUserExist).toHaveBeenCalledWith(mockReq.body.email);
    expect(mockNext).toHaveBeenCalledWith(new Conflict(`Email ${mockReq.body.email} is already exist`));
  });

  test('SignUp with error database', async () => {
    const testError = new Error('Database error');
    const isUserExist = (authService.isUserExist = jest.fn(async () => {
      throw testError;
    }));
    await usersController.signupUser(mockReq, mockRes, mockNext);
    expect(isUserExist).toHaveBeenCalledWith(mockReq.body.email);
    expect(mockNext).toHaveBeenCalledWith(testError);
  });
});
describe('Unit test login', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    console.log('Выполнить в начале каждого теста');
    mockReq = { body: { email: 'test@test.com', password: '12345678' } };
    // цепочная функция mockReturnThis; возвращает this тогоже  обьекта и у него будет json jest fn
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn(data => data) };
    mockNext = jest.fn();
    authService.setToken = jest.fn(async data => data);
  });
  test('Login User should with email and password', async () => {
    const authentificationUser = (authService.getUser = jest.fn(data => data));
    authService.getToken(authentificationUser);
    await usersController.loginUser(mockReq, mockRes, mockNext);
    expect(authentificationUser).toHaveBeenCalledWith(mockReq.body.email, mockReq.body.password);
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatusCode.OK);
  });
});
//   // beforeAll(() => {
//   //   console.log('Выполнить в начале тестов');
//   // });

//   // afterAll(() => {
//   //   console.log('Выполнить после тестов');
//   // });

//   // beforeEach(() => {
//   //   console.log('Выполнить в начале каждого теста');
//   // });

//   // afterEach(() => {
//   //   console.log('Выполнить в конце каждого теста');
//   // });
