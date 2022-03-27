const usersService = require('../../services/users');
const {signupUser,loginUser, logoutUser} = require('../../controllers/index');


  describe('Unit test singUp', () => {
      
    let req, res, next;

    beforeEach(() => {
        req = {body:{ email:'test@test.com', password: '123456789'}};
        res = {status:jest.fn().mockReturnThis(),json:jest.fn(data => data)};
        next = jest.fn();
        usersService.create=jest.fn(async data => data)
    })

    test('SignUp new user', async () => {
        usersService.isUserExist = jest.fn(async ()=> false);
        await signupUser(req,res,next);
        expect(usersService.isUserExist).toHaveBeenCalledWith(req.body.email);
        expect(res.status).toHaveBeenCalledWith(201)
    })

    test('SignUp an existing User', async () => {
        usersService.isUserExist = jest.fn(async ()=> true);
        await signupUser(req,res,next);
        expect(usersService.isUserExist).toHaveBeenCalledWith(req.body.email);
        expect(res.status).toHaveBeenCalledWith(409)
    })

    test('SignUp with error database', async () => {
        const testError = new Error('Database ERROR!!!');
        usersService.isUserExist = jest.fn(async () => {throw testError});
        await signupUser(req,res,next);
        expect(usersService.isUserExist).toHaveBeenCalledWith(req.body.email);
        expect(next).toHaveBeenCalledWith(testError)
    })

  })

  describe('Unit test login', () => {

    let req, res, next;
    beforeEach(() => {
        req = {body:{ email:'test@test.com', password: '123456789'}};
        res = {status:jest.fn().mockReturnThis(),json:jest.fn(data => data)};
        next = jest.fn();
        usersService.setToken = jest.fn(async data => data)
    })

    test('Login success User', async () => {
        usersService.getUser = jest.fn(async () => true);
        usersService.getToken = jest.fn(async () => true);
        await loginUser(req,res,next);
        expect(usersService.getUser).toHaveBeenCalledWith(req.body.email,req.body.password);
        expect(res.status).toHaveBeenCalledWith(200)
    })

    test('Login error User', async () => {
        usersService.getUser = jest.fn(async () => false);
        await loginUser(req,res,next);
        expect(usersService.getUser).toHaveBeenCalledWith(req.body.email,req.body.password);
        expect(res.status).toHaveBeenCalledWith(401)
    })

    test('Login with error database', async () => {
        const testError = new Error('Database ERROR!!!');
        usersService.getUser = jest.fn(async () => {throw testError})
        await loginUser(req,res,next);
        expect(usersService.getUser).toHaveBeenCalledWith(req.body.email,req.body.password);
        expect(next).toHaveBeenCalledWith(testError)
    })

  })

  describe('Unit test logout', () => {

    let req, res, next;

    beforeEach(() => {
        req = {user:{ _id:'123445565656'}};
        res = {status:jest.fn().mockReturnThis(),json:jest.fn(data => data)};
        next = jest.fn();
    })

    test('Logout success User', async() => {
        usersService.setToken = jest.fn(async data => data);
        await logoutUser(req, res, next);
        expect(usersService.setToken).toHaveBeenCalledWith(req.user,null);
        expect(res.status).toHaveBeenCalledWith(204)
    })

    test('Logout with error database', async () => {
        const testError = new Error('Database ERROR!!!');
        usersService.setToken = jest.fn(async () => {throw testError});
        await logoutUser(req, res, next);
        expect(usersService.setToken).toHaveBeenCalledWith(req.user,null);
        expect(next).toHaveBeenCalledWith(testError)
    })

  })