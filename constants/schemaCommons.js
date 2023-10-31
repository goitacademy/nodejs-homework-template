const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const subscriptionEnums = ['starter', 'pro', 'business'];

module.exports = {
  emailRegexp,
  phoneRegexp,
  subscriptionEnums,
};
