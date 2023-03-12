const phoneRegexp = /^([0-9]{0,15})?(\([0-9]{3})?(\) [0-9]{3})?([-]{1})?([0-9]{3})?(\+[0-9]{0,14})?$/
const mailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

module.exports = {
  phoneRegexp,
  mailRegexp,
}