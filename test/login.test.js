const mockingoose = require('mockingoose');
const login = require('../controllers/users/loginUser');
const Users = require('../models/users');
const { Request, Response } =require ('express');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
const mockRequest = (email, password) => {
    return {
        body: {
            email: email,
            password: password
        }
        };
    };

test('http 400', async () => {
    let req ={
        body: {
            email: 'test@test.com'
        }
        };
        let result = {
            status: 'error',
            code: 400
        }
    let res = {
            send: function(){ },
            json: function(err){
                return {
                    status: 'error',
                    code: 400
                  };
            },
            status: function(responseStatus) {
                return this; 
            }
        }
        
 expect(await login.loginUser(req, res)).toStrictEqual(result)
});

test('http 401', async () => {
    let req ={
        body: {
            email: 'test@test.com',
            password: 'incorrect password'
        }
        };
        let result = {
            status: 'error',
            code: 401
        }
    let res = {
            send: function(){ },
            json: function(err){
                return {
                    status: 'error',
                    code: 401
                  };
            },
            status: function(responseStatus) {
                return this; 
            }
        }
        
 expect(await login.loginUser(req, res)).toStrictEqual(result)
});

test('http 200', async () => {
    let req ={
        body: {
            email: 'test@test.com',
            password: 'correct password'
        }
        };
        let result = {
            status: 'success',
            code: 200
        }
    let res = {
            send: function(){ },
            json: function(){
                return {
                    status: 'success',
                    code: 200
                  };
            },
            status: function(responseStatus) {
                return this; 
            }
        }
        
 expect(await login.loginUser(req, res)).toStrictEqual(result)
});

test('http mock', async () => {
    const req = mockRequest(
        {},
        {
          username: 'guest',
          password: 'guest-boss'
        }
      );
      const res = mockResponse();

    let result = {
            status: 'success',
            code: 200
        }
        
 expect(await login.loginUser(req, res)).toStrictEqual(result)
});