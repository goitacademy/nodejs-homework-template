const authenticate = require('../middlewares/authenticate')
require("dotenv").config();
const {NotAutorisate}=require('../helpers/errors')

//const secret = process.env.SECRET

describe('autentification test', ()=> {
    it('should call next() and add userwith token properties to req object',() => {
          
           const mReq={
            headers:{}
        }
        const mRes={};
        const mockNext=jest.fn();
        authenticate(mReq, mRes,mockNext)
        expect(mockNext).toHaveBeenCalledWith(new NotAutorisate('please, provide a token') )
        console.log('Выполнить в начале тестов');
    })})