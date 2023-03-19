const authenticate = require('../middlewares/authenticate')
const jwt=require('jsonwebtoken');
require("dotenv").config();
const {NotAutorisate}=require('../helpers/errors')
const { v4: uuidv4 } = require('uuid');
const secret = process.env.SECRET

describe('autentification test', ()=> {
    it('should call next() and add userwith token properties to req object',() => {
       const user={
    _id:'1',
    createdAt:new Date().getTime()
       }
       const token = jwt.sign( {_id:user._id,createdAt:user.createdAt} , secret, { expiresIn: "3h" });
         
           const mReq={
            headers:{
                'authorization':`bearer${token}`
            }
        }
        const mRes={};
        const mockNext=jest.fn()
        authenticate(mReq, mRes,mockNext)
        expect(mReq.token).toBe(token)
        expect(mReq.user._id).toBe(user._id)
        expect(mReq.user.createdAt).toBe(user.createdAt)
        expect(mockNext).toHaveBeenCalled()
        console.log('Выполнить в начале тестов');
    })})