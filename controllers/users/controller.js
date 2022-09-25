const usersServices = require('../../services/usersServices');
const usersSchemas = require('../../schemas/usersSchemas');
const RequestError = require('../../helpers/RequestError');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const { error } = usersSchemas.registerUser.validate({ email, password });
    if (error) throw RequestError(400, error.details[0].message);

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = await usersServices.register({
        email,
        password: hashedPassword,
    });

    res.json(newUser);
};

module.exports = {
    registerUser,
};
