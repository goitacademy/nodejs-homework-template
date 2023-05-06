const namePattern = /^[A-Za-z ]+$/;
const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const patterns = { namePattern, phonePattern, emailPattern };

module.exports = patterns;
