const jwt = require('jsonwebtoken');

const payload = { id: 'Ukraine', username: 'Yuriy' };
const secret = 'smert` mascalyam';
const token = jwt.sign(payload, secret);

console.log('token ---->', token);
// result there https://jwt.io/

// Декодування токена
const decode = jwt.decode(token);

console.log('decode ---->', decode);

// Для автентифікації токена необхідно використовувати функцію верифікації.

const verify = jwt.verify(token, secret);

console.log('verify ---->', verify);
