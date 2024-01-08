const { model, Schema } = require("mongoose");

const tokenShema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },

  refreshToken: {
    type: String,
    required: true,
  },
});

const Token = model("Token", tokenShema);

module.exports = Token;
