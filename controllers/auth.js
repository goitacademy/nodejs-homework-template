const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {User} = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers/index");

const { SECRET_KEY } = process.env;

/* const createHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const result = await bcrypt.hash(password, 10);
  console.log(result);
  const compareResult1 = await bcrypt.compare(password, result);
  console.log(compareResult1);
  const compareResult2 = await bcrypt.compare('123457', result);
  console.log(compareResult2);
};

createHashPassword("123456") */


/* const jwt = require('jsonwebtoken');
require("dotenv").config();

const { SECRET_KEY } = process.env;

const payload = {
    id: "kbvaskdbvujfdvbsbjnoj"
};

const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
const decodeToken = jwt.decode(token);
console.log(token);

try {
    const {id} = jwt.verify(token, SECRET_KEY);
    cosole.log(id);
    const invalidToken = "esempiomnvjidsfvbisebvsblnibhjsrnb";
    const result = jwt.verify(invalidToken, SECRET_KEY);
}
catch(error) {
    console.log(error.message);
}
*/

const register = async(req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashPassword});
    
    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    });
   
};

const login = async(req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({email});

    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }


    const passwordCompare = await bcrypt.compare(password, user.password);

    if(!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"}) ;
    /* .status(201) */
    res.json({
        token,
    });
   
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
};