const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const feedbackSchama = new Schema(
  {
    name: {
      type: String,
      required: true,
      match: /^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$/,
    },
    email: {
      type: String,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      default: "Not email:(",
    },
    phone: {
      type: String,
      match: /^[0-9: -/+]+$/,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "feedback",
    //   required: true,
    // },
  },
  { versionKey: false, timestamps: true }
);

feedbackSchama.post("save", handleMongooseError);

const Feedback = model("feedback", feedbackSchama);

module.exports = Feedback;
