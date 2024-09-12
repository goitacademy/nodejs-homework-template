const jwt = require('jsonwebtoken');

const payload = { id: 'Ukraine', username: 'Yuriy' };
const { SECRET_KEY } = process.env;

const token = jwt.sign(payload, SECRET_KEY);

console.log('token ---->', token);
// result there https://jwt.io/

// Декодування токена
const decode = jwt.decode(token);

console.log('decode ---->', decode);

// Для автентифікації токена необхідно використовувати функцію верифікації.

const verify = jwt.verify(token, SECRET_KEY);

console.log('verify ---->', verify);
