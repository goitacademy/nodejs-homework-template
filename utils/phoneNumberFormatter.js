function phoneNumberFormatter(phoneNumber) {
  const firstGroup = phoneNumber.slice(0, 3)
  const secondGroup = phoneNumber.slice(3, 6)
  const thirdGroup = phoneNumber.slice(6, 10)
  const formatedNumber = `(${firstGroup}) ${secondGroup}-${thirdGroup}`
  return formatedNumber
}

module.exports = phoneNumberFormatter
