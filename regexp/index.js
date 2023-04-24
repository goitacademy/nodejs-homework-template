const regName = `^[a-zA-Z]+ [a-zA-Z]+$`;
const regEmail = {
  minDomainSegments: 2,
  tlds: { allow: ["com", "net"] },
};
const regPhone = /^\(\d{3}\) \d{3}-\d{4}$/;

module.exports = {
  regName,
  regEmail,
  regPhone,
};
