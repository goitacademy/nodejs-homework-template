const jwt = require('jsonwebtoken');

const payload = { id: 'Ukraine', username: 'Yuriy' };
const secret = 'smert` mascalyam';
const token = jwt.sign(payload, secret);

console.log(token);
// result there https://jwt.io/
