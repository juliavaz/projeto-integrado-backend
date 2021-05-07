const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is a required field.'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          const emailRegex = /\S+@\S+\.\S+/;
          return emailRegex.test(v.toLowerCase());
        },
        message: 'A valid email is required.',
      },
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
      enum: ['user', 'moderator', 'admin'],
      default: 'user',
    },
    activationToken: {
      type: String,
    },
    activated: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
    },
    passwordUpdatedAt: {
      type: Date,
      default: Date.now,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual Properties
userSchema.virtual('daysSinceRegistration').get(function () {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Model Methods
userSchema.methods.checkPassword = async function (passwordInput, userPassword) {
  return await bcrypt.compare(passwordInput, userPassword);
};

userSchema.methods.passwordChangedAfter = function (timestamp) {
  // Returns true if password has been changed after the provided timestamp
  return parseInt(new Date(this.passwordUpdatedAt).getTime() / 1000) > timestamp;
};

userSchema.methods.createActivationToken = async function () {
  const token = crypto.randomBytes(32).toString('hex');

  this.activationToken = crypto.createHash('sha256').update(token).digest('hex');

  this.save({ validateBeforeSave: false });

  return token;
};

userSchema.methods.createPasswordResetToken = async function () {
  const token = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');

  this.passwordResetExpires = Date.now() + 24 * 60 * 60 * 1000;

  this.save({ validateBeforeSave: false });

  return token;
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

const User = mongoose.model('User', userSchema);

module.exports = User;
