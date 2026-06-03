const mongoose = require('mongoose');

const centerInfoSchema = new mongoose.Schema(
  {
    centerName: { type: String, required: true, default: 'AKTC - Aptech TecTerminal Kubwa' },
    address: { type: String },
    contactEmail: { type: String },
    phone: { type: String },
    about: { type: String },
    socialLinks: {
      facebook: String,
      twitter: String,
      instagram: String,
    },
    logoUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('CenterInfo', centerInfoSchema);