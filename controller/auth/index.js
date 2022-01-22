// import repositoryContacts from '../../repository/contacts.js';
import {httpCode} from '../../lib/constants.js';
import AuthServis from '../../service/index.js';

const authServis = new AuthServis();


const registration = async (req, res, next) =>{
    // console.log(req.body);
    const {email } = req.body;

    const isUserExist = await authServis.isUserExist(email);
    if (isUserExist) {
        console.log('isUserExist', isUserExist);
        return res.status(httpCode.CONFLICT).
        json({status: 'Error', code: httpCode.CONFLICT, message: 'email is alredy exist'});
     };
     const data = await authServis.create(req.body) 
   res.status(httpCode.OK).
   json({status: 'succes', code: httpCode.OK, data});
};

const logIn = async (req, res, next) =>{
    const {email, password } = req.body;
    const user = await authServis.getUser(email, password);
    console.log(user);
    if (!user) {
        console.log('isUserExist', user);
        return res.status(httpCode.UNAUTHORIZED).
        json({status: 'Error', code: httpCode.CONFLICT, message: 'invalid credentials'});
     };
    const token = authServis.getToken(user)
   await authServis.setToken(user.id, token)
   res.status(httpCode.OK).
   json({status: 'succes', code: httpCode.OK, data: {token}});
};

const logOut = async (req, res, next) =>{
    await authServis.setToken(req.user.id, null)

   res.status(httpCode.NO_CONTENT).
   json({status: 'succes', code: httpCode.OK, data: {message: 'logOut is true'}});
};

export {registration, logIn, logOut}
