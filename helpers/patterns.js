const nameRegexp = /^[A-Za-z ]+$/;
const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const patterns = { nameRegexp, phoneRegexp, emailRegexp };

module.exports = patterns;