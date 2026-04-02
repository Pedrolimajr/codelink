const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  password: { type: String, default: null },
  clicks: { type: Number, default: 0 },
  expiresAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

// Índice para expiração automática se o campo expiresAt for preenchido
UrlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Url', UrlSchema);