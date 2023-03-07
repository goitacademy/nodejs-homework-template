const bcrypt = require('bcryptjs');
const {findUserInDb, addNewUser} = require('../../services');
const {userValidation} = require('../../middlewares');

const registrationController = async (req, res) => {

const {error} = userValidation.validate(req.body);
const {email} = req.body;
const userIsAlreadyInDb = await findUserInDb(email);

if (error) {
    return res.status(400).json(error.details[0].message);
};

if (userIsAlreadyInDb) {
    return res.status(409).json({message: "Email in use"});
}

const registration = await addNewUser(req.body);

   return res.status(201).json({user: {
    email: email,
    subscription: "starter"
  }}) 




};

module.exports = registrationController;