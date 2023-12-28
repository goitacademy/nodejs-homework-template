const subscrENUM = {
  STARTER: "starter",
  PRO: "pro",
  BUSINESS: "business",
};

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

module.exports = {
  subscrENUM: subscrENUM,
  emailRegexp: emailRegexp,
};
