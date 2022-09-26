const usersServices = require('../../services/usersServices');
const usersSchemas = require('../../schemas/usersSchemas');
const RequestError = require('../../helpers/RequestError');

const registerUser = async (req, res) => {
    const { error, value: userData } = usersSchemas.registerUser.validate(
        req.body,
    );
    if (error) throw RequestError(400, error.details[0].message);

    const newUser = await usersServices.register(userData);

    res.status(201).json(newUser);
};

const logInUser = async (req, res) => {
    const { error, value: userData } = usersSchemas.registerUser.validate(
        req.body,
    );
    if (error) throw RequestError(400, error.details[0].message);

    const loggedInUser = await usersServices.logIn(userData);

    res.json(loggedInUser);
};

const logOutUser = async (req, res) => {
    const { id } = req.user;

    await usersServices.logOut(id);

    res.status(204).json();
};

const listCurrentUser = async (req, res) => {
    const { id } = req.user;

    const currentUser = await usersServices.listCurrent(id);

    res.json(currentUser);
};

module.exports = {
    registerUser,
    logInUser,
    logOutUser,
    listCurrentUser,
};
