import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: [true, 'URL original é obrigatória'],
    match: [
      /^(https?):\/\/.+/,
      'Por favor, forneça uma URL válida'
    ]
  },
  code: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  shortUrl: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: null
  },
  expiresAt: {
    type: Date,
    default: null
  },
  clicks: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
});

// Índice para URLs expiradas
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Método para verificar se a URL expirou
urlSchema.methods.isExpired = function() {
  if (!this.expiresAt) return false;
  return new Date() > this.expiresAt;
};

export default mongoose.model('Url', urlSchema);
