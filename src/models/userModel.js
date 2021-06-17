const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is a required field.'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is a required field.'],
      minlength: [5, 'Passwords must have at least 5 characters.'],
      // Do not select/show user passwords by default
      select: false,
    },
    role: {
      type: String,
      enum: ['paciente', 'atendente', 'admin', 'medico'],
      default: 'paciente',
    },
    deleted: {
      type: Boolean,
    },
    passwordUpdatedAt: {
      type: Date,
      default: Date.now,
    },
    details: {
      dateOfBirth: Date,
      crm: Number,
      especialidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Especialidade',
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Model Methods
userSchema.methods.checkPassword = async function (passwordInput, userPassword) {
  return await bcrypt.compare(passwordInput, userPassword);
};

userSchema.methods.passwordChangedAfter = function (timestamp) {
  // Returns true if password has been changed after the provided timestamp
  return parseInt(new Date(this.passwordUpdatedAt).getTime() / 1000) > timestamp;
};

// Middlewares
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordUpdatedAt = Date.now();
  }

  return next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ deleted: { $ne: true } });
  next();
});

// Static Methods
userSchema.statics.getModelName = (type = 'singular') => {
  return type === 'plural' ? 'users' : 'user';
};

const User = mongoose.model('User', userSchema);

module.exports = User;
