const emailRegExp = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const nameRegExp = /^[a-z0-9\s?]{3,15}$/i

module.exports = {
    emailRegExp,
    phoneRegExp,
    nameRegExp
}