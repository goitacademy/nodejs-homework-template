const { model, Schema } = require("mongoose");

const subscriptionShema = new Schema({
  value: {
    type: String,
    unique: true,
    default: "User",
  },
});

const subscription = model("subscription", subscriptionShema);

module.exports = subscription;
