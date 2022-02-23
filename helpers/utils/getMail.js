const {URL} = require('..');

const subject = 'Some title'

const getMail = (email, token) => ({
    email,
    subject,
    html: `<a href="${URL.base}/${URL.users}/${token}"></a>`
})

module.exports = getMail;