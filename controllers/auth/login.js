const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { basedir } = global;
const { User, schemas } = require( `${basedir}/models/user`);

const { SECRET_KEY } = process.env;

const { createError } = require(`${basedir}/helpers`);


const login = async (req, res) => {
    const { error } = schemas.login.validate(req.body);

    if ( error ) { 
        throw createError(400, error.message);
    }
    //Ящо такий користувач user є и співпали паролі то висилаем токен
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if ( !user ) {
        throw createError(401, `Такого email -${email} в базе данных нету`);
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    //user.password - пароль що сберігається в базі
    if ( !comparePassword) {
        throw createError(401, 'Нет такого пароля');
    }
    //создаемао payload
    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"});

    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        token,
    })


}

module.exports = login;