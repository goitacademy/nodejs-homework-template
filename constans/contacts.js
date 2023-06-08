const nameRegexp = /^[A-Za-z ]+$/;

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

module.exports = {
    emailRegexp,
    nameRegexp,
    phoneRegexp,
}