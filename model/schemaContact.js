const { Schema, model, SchemaTypes } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for this contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for this contact'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for this contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  },
);

contactSchema.virtual('status').get(function () {
  if (this.favorite) {
    return 'best friend';
  }

  return 'not best friend';
});

contactSchema.plugin(mongoosePaginate);

const Contacts = model('contact', contactSchema);

module.exports = Contacts;
