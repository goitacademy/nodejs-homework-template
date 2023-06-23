const nameRegexp = /^[a-zA-Zа-яА-ЯіІїЇєЄёЁ'’\s-]+$/;
const phoneRegexp = /^(\(\d{3}\)|\d{3}) ?-? ?\d{3} ?-? ?\d{4}$/;
const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

module.exports = {
  nameRegexp,
  phoneRegexp,
  emailRegexp,
};
