import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  shortUrl: { type: String, required: true },
  password: { type: String, default: null },
  clicks: { type: Number, default: 0 },
  expiresAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

UrlSchema.methods.isExpired = function() {
  if (!this.expiresAt) return false;
  return new Date() > this.expiresAt;
};

export default mongoose.model('Url', UrlSchema);