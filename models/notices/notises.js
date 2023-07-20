const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noticeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for notice'],
    },
    date: {
      type: Date,
      required: [true, 'Set date for notice'],
    },
    category: {
      type: String,
      enum: ["sell", "lost-found", "for-free"],
      required: [true, 'Set category for notice'],
    },
    type: {
      type: String,
      required: [true, 'Set type for notice'], 
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: [true, 'Set sex for notice'],      
    },
    location: {
      type: String,
      required: [true, 'Set location for notice'],
    },
    price: {
      type: Number,
      required: [true, 'Set price for notice'],
    },
    comments: {
      type: String,
      default:''
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
     fileURL: String
  },
    {
      timestamps: true,
      versionKey: false
  }
);

const Notice = mongoose.model('Notice', contactSchema);

module.exports = Notice;
