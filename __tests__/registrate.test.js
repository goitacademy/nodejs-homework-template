// const authenticate = require('../middlewares/authenticate')
// const jwt=require('jsonwebtoken');
// require("dotenv").config();
// const {NotFoundError}=require('../helpers/errors')
// const { v4: uuidv4 } = require('uuid');
// //const secret = process.env.SECRET

// describe('registrationServis test', ()=> {
//     it('should call next() and add userwith token properties to req object',() => {
          
//            const mReq={
//             headers:{}
//         }
//         const mRes={};
//         const mockNext=jest.fn();
//         authenticate(mReq, mRes,mockNext)
//         expect(mockNext).toHaveBeenCalledWith(new NotFoundError('please, provide a token') )
//         console.log('Выполнить в начале тестов');
//     })})